import { useContext, useEffect, useState } from "react";
import { FlexboxCol, FlexboxRow, XClose } from "util/common_styles";
import warningIcon from "../../images/warningicon.png";
import { Broadcast } from "types/broadcast";
import {
	createDBEntry,
	deleteDBEntry,
	getDBEntry,
	updateDBEntry,
} from "util/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	ErrorMessage,
	FormContents,
	FormHeader,
	ImgWithMargin,
	InputLabel,
	FormSubmitButton,
} from "styles";
import { Trip } from "types/trip";
import { AuthContext } from "util/auth-context";

interface NewEventProps {
	cancelHandler: () => void;
	eventData?: Broadcast;
	children?: React.ReactNode;
}

const EventForm: React.FC<NewEventProps> = ({ eventData, cancelHandler }) => {
	const fields = {
		rsvp: {
			val: eventData ? eventData.rsvp : 0,
			valid: true,
			errorMessage: "",
		},
		images: {
			val: "",
			valid: true,
			errorMessage: "",
		},
		description: {
			val: eventData ? eventData.description : "",
			valid: true,
			errorMessage: "Description can't be empty",
		},
		datetime: {
			val: "",
			valid: true,
			errorMessage: "Date can't be empty",
		},
		category: {
			val: eventData ? eventData.category : "",
			valid: true,
			errorMessage: "Category can't be empty",
		},
		location: {
			val: eventData ? eventData.location : "",
			valid: true,
			errorMessage: "Location can't be empty",
		},
		title: {
			val: eventData ? eventData.title : "",
			valid: true,
			errorMessage: "Title can't be empty",
		},
		trip: {
			val: "",
			valid: true,
			errorMessage: "",
		},
	};

	const authContext = useContext(AuthContext);
	const [formInputs, setFormInputs] = useState(fields);
	const [errorMessage, setErrorMessage] = useState("");
	const [userTrips, setUserTrips] = useState<Trip[]>();
	const [tripId, setTripId] = useState<String>();
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	useEffect(() => {
		async function runThis() {
			let response: Trip | Trip[] | any;
			if (location.pathname.includes("home")) {
				setUserTrips(authContext.userInfo?.trips);
			} else if (location.pathname.includes("trips")) {
				setTripId(params.id);
				response = await getDBEntry<Trip>("trips", String(params.id));
				response.ok
					? setUserTrips([response.getJson.objects])
					: setErrorMessage(response.getJson.message);
			} else if (location.pathname.includes("events")) {
				setTripId(eventData?.trip._id);
			}
		}
		runThis();
	}, [location.pathname, authContext.userInfo, params.id, eventData?.trip._id]);

	const validateInputsForSubmit = () => {
		let isValid: boolean = true;
		Object.keys(formInputs).forEach((key: any) => {
			const input = formInputs[key];
			if (
				(key === "title" ||
					key === "location" ||
					key === "datetime" ||
					key === "description" ||
					key === "category") &&
				input.val === ""
			) {
				isValid = false;
				setErrorMessage(input.errorMessage);
				setFormInputs((prev) => ({
					...prev,
					[key]: { ...input, valid: false },
				}));
			}
		});
		return isValid;
	};

	const sendEventRequestToBE = async (mode: String, data?: Broadcast | any) => {
		let response: any;
		if (mode === "create") {
			response = await createDBEntry<Broadcast>("events", data);
		} else if (mode === "update") {
			response = await updateDBEntry<Broadcast>("events", eventData!._id, data);
		} else {
			response =
				window.confirm("Operation irreversable, are you sure?") &&
				(await deleteDBEntry<Broadcast>("events", eventData!._id));
		}
		if (response) {
			if (response.ok) {
				cancelHandler();
				mode === "create"
					? location.pathname.includes("trips")
						? window.location.reload()
						: navigate(`/events/${response.getJson.objects._id}`)
					: mode === "update"
					? window.location.reload()
					: navigate("/events");
			} else {
				setErrorMessage(response.getJson);
			}
		}
	};

	const submitEventForm = (event: any, mode: String) => {
		event.preventDefault();
		if (mode === "create" || mode === "update") {
			let formData: Broadcast | any = Object.fromEntries(
				new FormData(document.forms[0] as HTMLFormElement).entries()
			);
			formData.trip = tripId;
			const isValid = validateInputsForSubmit();
			isValid && sendEventRequestToBE(mode, formData);
		} else {
			sendEventRequestToBE(mode);
		}
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type:
			| "trip"
			| "title"
			| "location"
			| "category"
			| "datetime"
			| "description"
			| "rsvp"
			| "images";
		value: String;
	}) => {
		setFormInputs({
			...formInputs,
			[type]: {
				...formInputs[type],
				val: value,
				valid:
					(type === "title" ||
						type === "location" ||
						type === "datetime" ||
						type === "category") &&
					value === ""
						? false
						: true,
			},
		});
		type === "trip" &&
			setTripId(
				userTrips
					?.filter((trip) => trip.title === value)
					.map((trip) => trip._id)[0]
			);
	};

	return (
		<FlexboxCol>
			<FormHeader>Start a new event</FormHeader>
			<XClose type="button" onClick={cancelHandler} />
			<FormContents method="post">
				{errorMessage && (
					<ErrorMessage>
						<ImgWithMargin src={warningIcon} alt="warning icon" />
						{errorMessage}
					</ErrorMessage>
				)}
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="trip">Trip:</InputLabel>
					{userTrips?.length === 1 ? (
						<input
							type="text"
							name="trip"
							id="trip"
							value={userTrips[0].title}
							readOnly
						/>
					) : (
						<div>
							<input
								list="trips"
								name="trip"
								id="trip"
								defaultValue={formInputs.trip.val}
								onChange={(e) => {
									inputOnChange({ type: "trip", value: e.target.value });
								}}
							/>
							<datalist id="trips">
								{userTrips?.map((trip) => (
									<option key={trip._id} value={trip.title} />
								))}
							</datalist>
						</div>
					)}
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="title">Title:</InputLabel>
					<input
						type="text"
						name="title"
						id="title"
						defaultValue={formInputs.title.val}
						onChange={(e) => {
							inputOnChange({ type: "title", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="location">Location:</InputLabel>
					<input
						type="text"
						name="location"
						id="location"
						defaultValue={formInputs.location.val}
						onChange={(e) => {
							inputOnChange({ type: "location", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="datetime">Date:</InputLabel>
					<input
						type="datetime-local"
						name="datetime"
						id="datetime"
						// TODO update the value of the date and time when the date picker is finished
						onChange={(e) => {
							inputOnChange({ type: "datetime", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="description">Description:</InputLabel>
					<textarea
						name="description"
						id="description"
						defaultValue={formInputs.description.val}
						cols={30}
						rows={3}
						onChange={(e) => {
							inputOnChange({ type: "description", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="category">Category:</InputLabel>
					<input
						list="categories"
						name="category"
						defaultValue={formInputs.category.val}
						onChange={(e) => {
							inputOnChange({ type: "category", value: e.target.value });
						}}
					/>
					<datalist id="categories">
						<option value="Nature" />
						<option value="Ride Share" />
						<option value="City Walks" />
						<option value="Tour" />
					</datalist>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="rsvp">Rsvp:</InputLabel>
					<input
						type="number"
						name="rsvp"
						min={0}
						id="rsvp"
						defaultValue={Number(formInputs.rsvp.val)}
						onChange={(e) => {
							inputOnChange({ type: "rsvp", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<InputLabel htmlFor="images">Images:</InputLabel>
					<input
						type="file"
						name="images"
						id="images"
						onChange={(e) => {
							inputOnChange({ type: "images", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				{location.pathname.includes("events") ? (
					<FlexboxRow>
						<FormSubmitButton
							type="button"
							onClick={(event) => submitEventForm(event, "delete")}
						>
							Delete
						</FormSubmitButton>
						<FormSubmitButton
							type="button"
							onClick={(event) => submitEventForm(event, "update")}
						>
							Save
						</FormSubmitButton>
					</FlexboxRow>
				) : (
					<FormSubmitButton
						type="button"
						onClick={(event) => submitEventForm(event, "create")}
					>
						Create
					</FormSubmitButton>
				)}
			</FormContents>
		</FlexboxCol>
	);
};

export default EventForm;
