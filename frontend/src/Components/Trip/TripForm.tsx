import { json, useNavigate, useParams } from "react-router-dom";

import { Trip } from "../../types/trip";
import classes from "./TripForm.module.css";
import { useState } from "react";
import { createTrip, updateTrip } from "util/api";

interface TripFormProps {
	method: any;
	tripData?: Trip;
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const TripForm: React.FC<TripFormProps> = (props) => {
	const [formErrors, setFormErrors] = useState({
		name: "",
		location: "",
		description: "",
	});
	const navigate = useNavigate();
	const params = useParams();

	const validateFormInputs = (FormData: any) => {
		FormData.name === ""
			? setFormErrors((prev) => ({
					...prev,
					name: "Name is required!",
			  }))
			: setFormErrors((prev) => ({ ...prev, name: "" }));

		FormData.location === ""
			? setFormErrors((prev) => ({
					...prev,
					location: "Location is required!",
			  }))
			: setFormErrors((prev) => ({ ...prev, location: "" }));

		FormData.description === ""
			? setFormErrors((prev) => ({
					...prev,
					description: "Description is required!",
			  }))
			: setFormErrors((prev) => ({ ...prev, description: "" }));
	};

	const submitHandler = async (event: any) => {
		event.preventDefault();

		const FormData: any = {
			name: event.target.name.value,
			location: event.target.location.value,
			description: event.target.description.value,
		};

		validateFormInputs(FormData);

		if (
			FormData.name !== "" &&
			FormData.location !== "" &&
			FormData.description !== ""
		) {
			let res: any;
			if (props.method === "PATCH") {
				const id: any = params.id;
				res = await updateTrip(id, FormData);
			} else {
				res = await createTrip(FormData);
			}

			if (res.error) {
				throw json(
					{ message: res.error.message },
					{ status: res.error.status }
				);
			}

			props.cancelHandler();

			if (props.method === "POST") {
				navigate("/trips/" + res.trip._id);
			} else {
				navigate("/trips/" + params.id);
			}
		}
	};

	return (
		<div className={classes.card_container}>
			<span className={classes.card_close} onClick={props.cancelHandler}>
				X
			</span>
			<p className={classes.paragraph}>Start your trip</p>
			<form
				method={props.method}
				className={classes.form}
				onSubmit={submitHandler}
			>
				<p style={{ color: "orange" }}>{formErrors.name}</p>
				<p>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="name"
						id="name"
						defaultValue={props.tripData ? props.tripData.name : ""}
					/>
				</p>
				<p style={{ color: "orange" }}>{formErrors.location}</p>
				<p>
					<label htmlFor="location">Location:</label>
					<input
						type="text"
						name="location"
						id="location"
						defaultValue={props.tripData ? props.tripData.location : ""}
					/>
				</p>
				<p style={{ color: "orange" }}>{formErrors.description}</p>
				<p>
					<label htmlFor="description">Description:</label>
					<textarea
						name="description"
						id="description"
						placeholder="Tell us more about your trip"
						cols={30}
						rows={3}
						defaultValue={props.tripData ? props.tripData.description : ""}
					/>
				</p>
				<div className={classes.actions}>
					<button type="button" onClick={props.cancelHandler}>
						Cancel
					</button>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default TripForm;
