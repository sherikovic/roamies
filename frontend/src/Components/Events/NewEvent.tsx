import { useState } from "react";
import styled from "styled-components";
import { FlexboxCol, FlexboxRow, XClose } from "util/common_styles";
import warningIcon from "../../images/warningicon.png";
import { Broadcast } from "types/broadcast";
import { createEvent } from "util/api";

interface NewEventProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const fields = {
	rsvp: {
		val: "",
		valid: true,
		errorMessage: "",
	},
	images: {
		val: "",
		valid: true,
		errorMessage: "",
	},
	description: {
		val: "",
		valid: true,
		errorMessage: "Description can't be empty",
	},
	datetime: {
		val: "",
		valid: true,
		errorMessage: "Date can't be empty",
	},
	category: {
		val: "",
		valid: true,
		errorMessage: "Category can't be empty",
	},
	location: {
		val: "",
		valid: true,
		errorMessage: "Location can't be empty",
	},
	title: {
		val: "",
		valid: true,
		errorMessage: "Title can't be empty",
	},
};

const NewEvent: React.FC<NewEventProps> = ({ cancelHandler }) => {
	const [formInputs, setFormInputs] = useState(fields);
	const [errorMessage, setErrorMessage] = useState("");

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

	const createNewEvent = async (data: Broadcast) => {
		const response = await createEvent(data);
		if (!response.ok) {
			setErrorMessage(response.getJson.message);
		} else {
			cancelHandler();
			// TODO redirect to some other page
		}
	};

	const newEventSubmit = (event: any) => {
		event.preventDefault();
		const formData: Broadcast | any = Object.fromEntries(
			new FormData(event.target as HTMLFormElement).entries()
		);
		const isValid = validateInputsForSubmit();
		isValid && createNewEvent(formData);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type:
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
	};

	return (
		<FlexboxCol>
			<EventFormHeader>Start a new event</EventFormHeader>
			<XClose type="button" onClick={cancelHandler} />
			<EventFormContents onSubmit={newEventSubmit} method="post">
				{errorMessage && (
					<Error>
						<Img src={warningIcon} alt="warning icon" />
						{errorMessage}
					</Error>
				)}
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="title">Title:</Label>
					<input
						type="text"
						name="title"
						id="title"
						onChange={(e) => {
							inputOnChange({ type: "title", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="location">Location:</Label>
					<input
						type="text"
						name="location"
						id="location"
						onChange={(e) => {
							inputOnChange({ type: "location", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="datetime">Date:</Label>
					<input
						type="datetime-local"
						name="datetime"
						id="datetime"
						onChange={(e) => {
							inputOnChange({ type: "datetime", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="description">Description:</Label>
					<textarea
						name="description"
						id="description"
						cols={30}
						rows={3}
						onChange={(e) => {
							inputOnChange({ type: "description", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="category">Category:</Label>
					<input
						list="categories"
						name="category"
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
					<Label htmlFor="rsvp">Rsvp:</Label>
					<input
						type="number"
						name="rsvp"
						id="rsvp"
						onChange={(e) => {
							inputOnChange({ type: "rsvp", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="images">Images:</Label>
					<input
						type="file"
						name="images"
						id="images"
						onChange={(e) => {
							inputOnChange({ type: "images", value: e.target.value });
						}}
					/>
				</FlexboxRow>
				<Submit type="submit">Create</Submit>
			</EventFormContents>
		</FlexboxCol>
	);
};

export default NewEvent;

const EventFormHeader = styled.h4`
	font-size: 23px;
	font-weight: 550;
	color: black;
	margin: 0;
	text-align: center;
	padding: 30px 0 30px 0;
	&:after {
		content: "______";
		display: block;
		color: #868080;
	}
`;

const EventFormContents = styled.form`
	display: flex;
	flex-direction: column;
	padding: 5px 40px;
`;

const Label = styled.label`
	margin-right: 10px;
`;

const Submit = styled.button`
	margin: 10px 40px;
`;

const Img = styled.img`
	height: 18px;
	width: 18px;
	min-height: 18px;
	min-width: 18px;
	margin-right: 8px;
	text-indent: 0px;
`;

const Error = styled.p`
	border: 1px solid #eac8c8;
	background-color: #eac8c8;
	font-size: 14px;
	color: #6c2f2f;
	margin-top: 10px;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
