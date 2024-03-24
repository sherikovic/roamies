import { Form, useActionData } from "react-router-dom";
import APIFormTextInputLabel from "./APIFormTextInputLabel";
import classes from "./APInfoForm.module.css";
import { User } from "types/user";

interface PersonalInfoFormProps {
	userData: User;
	children?: React.ReactNode;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
	const data: any = useActionData();
	const userInfo = props.userData;

	return (
		<Form method="patch">
			<div className={classes.api_form}>
				<p className={classes.api_form_header}>
					Update your personal information
				</p>
				{data && data.errorMessage && data.type === "personal" && (
					<p className={classes.api_form_header} style={{ color: "orange" }}>
						{data.errorMessage}
					</p>
				)}
				{data && data.successMessage && data.type === "personal" && (
					<p className={classes.api_form_header} style={{ color: "green" }}>
						{data.successMessage}
					</p>
				)}
				<APIFormTextInputLabel
					type="textarea"
					name="bio"
					value={props.userData ? userInfo.bio : ""}
					classDiv={classes.api_form_item}
					classInput={classes.api_input_field}
					classLabel={classes.api_input_label}
				/>
				<div className={classes.api_form_group_cc}>
					<APIFormTextInputLabel
						type="text"
						name="first name"
						value={props.userData ? userInfo.firstname : ""}
						classDiv={classes.api_form_item}
						classInput={classes.api_input_field}
						classLabel={classes.api_input_label}
					/>
					<APIFormTextInputLabel
						type="text"
						name="last name"
						value={props.userData ? userInfo.lastname : ""}
						classDiv={classes.api_form_item}
						classInput={classes.api_input_field}
						classLabel={classes.api_input_label}
					/>
				</div>
				<div className={classes.api_form_group_cc}>
					<APIFormTextInputLabel
						type="text"
						name="age"
						value={props.userData ? userInfo.age : ""}
						classDiv={classes.api_form_item}
						classInput={classes.api_input_field}
						classLabel={classes.api_input_label}
					/>
					<APIFormTextInputLabel
						type="text"
						name="country"
						value={props.userData ? userInfo.country : ""}
						classDiv={classes.api_form_item}
						classInput={classes.api_input_field}
						classLabel={classes.api_input_label}
					/>
				</div>
				<div className={classes.api_btn_save}>
					<button name={"personal"}>Save</button>
				</div>
			</div>
		</Form>
	);
};

export default PersonalInfoForm;
