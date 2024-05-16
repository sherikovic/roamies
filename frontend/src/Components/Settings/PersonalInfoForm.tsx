import { Form, useActionData } from "react-router-dom";
import { User } from "types/user";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "util/auth-context";
import {
	APIBtnSave,
	APIForm,
	APIFormHeader,
	APIFormInputLabel,
	APIFormItem,
	APIGroupCC,
	APIFormInputField,
	FlexboxRow,
} from "util/common_styles";

interface PersonalInfoFormProps {
	children?: React.ReactNode;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
	const data: any = useActionData();
	const userContext = useContext(AuthContext);
	const userData = userContext.userInfo as User;
	const fileInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (data && data.ok) {
			const updateUser = userContext.updateUserInfo;
			updateUser(data.data, userData);
		}
	}, [data, userContext.updateUserInfo, userData]);

	return (
		<Form method="patch">
			<APIForm>
				<APIFormHeader>Update your personal information</APIFormHeader>
				<FlexboxRow>
					<button
						onClick={() => fileInput.current && fileInput.current.click()}
					>
						Upload image
					</button>
					<input
						style={{ display: "none" }}
						type="file"
						accept="image/*"
						ref={fileInput}
					/>
				</FlexboxRow>
				{data && data.errorMessage && data.type === "personal" && (
					<APIFormHeader style={{ color: "orange" }}>
						{data.errorMessage}
					</APIFormHeader>
				)}
				{data && data.successMessage && data.type === "personal" && (
					<APIFormHeader style={{ color: "green" }}>
						{data.successMessage}
					</APIFormHeader>
				)}
				<APIGroupCC>
					<APIFormTextInputLabel
						type="text"
						name="first name"
						value={userData ? userData.firstname : ""}
					/>
					<APIFormTextInputLabel
						type="text"
						name="last name"
						value={userData ? userData.lastname : ""}
					/>
				</APIGroupCC>
				<APIGroupCC>
					<APIFormTextInputLabel
						type="text"
						name="age"
						value={userData ? userData.age : ""}
					/>
					<APIFormTextInputLabel
						type="text"
						name="country"
						value={userData ? userData.country : ""}
					/>
				</APIGroupCC>
				<APIFormTextInputLabel
					type="textarea"
					name="bio"
					value={userData ? userData.bio : ""}
				/>
				<APIFormHeader>Socials</APIFormHeader>
				<APIGroupCC>
					<APIFormTextInputLabel
						type="text"
						name="instagram"
						value={userData ? userData.social?.instagram : ""}
					/>
					<APIFormTextInputLabel
						type="text"
						name="twitter"
						value={userData ? userData.social?.twitter : ""}
					/>
				</APIGroupCC>
				<APIBtnSave>
					<button name={"personal"}>Save</button>
				</APIBtnSave>
			</APIForm>
		</Form>
	);
};

export default PersonalInfoForm;

interface APIFormTextInputLabelProps {
	type: string;
	name: string;
	value?: string;
	classDiv?: string;
	classInput?: string;
	classLabel?: string;
	children?: React.ReactNode;
}

const APIFormTextInputLabel: React.FC<APIFormTextInputLabelProps> = (props) => {
	return (
		<APIFormItem>
			<APIFormInputField
				type={props.type}
				placeholder={props.name}
				name={props.name}
				id={props.name}
				defaultValue={props.value}
			/>
			<APIFormInputLabel htmlFor={props.name}>
				{props.name.toUpperCase()}
			</APIFormInputLabel>
		</APIFormItem>
	);
};
