import { useState } from "react";
import styled from "styled-components";
import { Trip } from "types/trip";
import { createTrip } from "util/api";
import { XClose, FlexboxRow, FlexboxCol } from "util/common_styles";

interface NewTripProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const fields = {
	title: {
		val: "",
		valid: true,
		errorMessage: "Title can't be empty",
	},
	location: {
		val: "",
		valid: true,
		errorMessage: "Location can't be empty",
	},
	description: {
		val: "",
		valid: true,
		errorMessage: "",
	},
	startDate: {
		val: "",
		valid: true,
		errorMessage: "Start date can't be empty",
	},
	endDate: {
		val: "",
		valid: true,
		errorMessage: "",
	},
	images: {
		val: "",
		valid: true,
		errorMessage: "",
	},
};

const NewTrip: React.FC<NewTripProps> = ({ cancelHandler }) => {
	const [formInputs, setFormInputs] = useState(fields);
	const [errorMessage, setErrorMessage] = useState("");

	const validateInputsForSubmit = () => {
		let isValid: boolean = true;
		Object.keys(formInputs).forEach((key: any) => {
			const input = formInputs[key];
			if (
				(key === "title" || key === "location" || key === "startDate") &&
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

	const createNewTrip = async (data: Trip) => {
		const response = await createTrip(data);
		if (!response.ok) {
			setErrorMessage(response.getJson.message);
		} else {
			cancelHandler();
		}
		console.log(errorMessage);
	};

	const newTipSubmit = (event: any) => {
		event.preventDefault();
		const formData: Trip | any = Object.fromEntries(
			new FormData(event.target as HTMLFormElement).entries()
		);
		const isValid = validateInputsForSubmit();
		isValid && createNewTrip(formData);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type:
			| "title"
			| "location"
			| "description"
			| "startDate"
			| "endDate"
			| "images";
		value: String;
	}) => {
		setFormInputs({
			...formInputs,
			[type]: {
				...formInputs[type],
				val: value,
				valid:
					type === "title" ||
					type === "location" ||
					(type === "startDate" && value === "")
						? false
						: true,
			},
		});
	};

	return (
		<FlexboxCol>
			<TripFormHeader>Start a new trip</TripFormHeader>
			<XClose type="button" onClick={cancelHandler} />
			<TripFormContents onSubmit={newTipSubmit} method="post">
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
					<Label htmlFor="startDate">Start date:</Label>
					<FlexboxRow>
						<input
							type="date"
							name="startDate"
							id="startDate"
							onChange={(e) => {
								inputOnChange({ type: "startDate", value: e.target.value });
							}}
						/>
					</FlexboxRow>
				</FlexboxRow>
				<FlexboxRow style={{ marginBottom: "10px" }}>
					<Label htmlFor="endDate">End date:</Label>
					<FlexboxRow>
						<input
							type="date"
							name="endDate"
							id="endDate"
							onChange={(e) => {
								inputOnChange({ type: "endDate", value: e.target.value });
							}}
						/>
					</FlexboxRow>
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
			</TripFormContents>
		</FlexboxCol>
	);
};

export default NewTrip;

const TripFormHeader = styled.h4`
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

const TripFormContents = styled.form`
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
