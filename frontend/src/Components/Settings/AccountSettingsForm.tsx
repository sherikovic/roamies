import { Form, useActionData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "util/auth-context";
import { User } from "types/user";
import {
	APIBtnSave,
	APIForm,
	APIFormBtnSelect,
	APIFormBtnsSelect,
	APIFormHeader,
	APIFormInputLabel,
	APIFormItem,
	APIFormInputField,
	FlexboxRow,
} from "util/common_styles";

const AccountSettingsForm: React.FC = () => {
	const [changeEmail, setChangeEmail] = useState(true);
	const [changePassword, setChangePassword] = useState(false);
	const data: any = useActionData();

	const userContext = useContext(AuthContext);
	const userData = userContext.userInfo as User;

	useEffect(() => {
		if (data && data.ok) {
			const updateUser = userContext.updateUserInfo;
			console.log("data", data);
			const email = data.data.newEmail ?? userData.email;
			const password = data.data.newPassword ?? userData.password;
			updateUser({ email, password }, userData);
		}
	}, [data, userContext.updateUserInfo, userData]);

	return (
		<APIForm>
			<APIFormHeader>What would you like to change?</APIFormHeader>
			{data &&
				data.errorMessage &&
				((changeEmail && data.type === "email") ||
					(changePassword && data.type === "password")) && (
					<APIFormHeader style={{ color: "orange" }}>
						{data.errorMessage}
					</APIFormHeader>
				)}
			{data &&
				data.successMessage &&
				((changeEmail && data.type === "email") ||
					(changePassword && data.type === "password")) && (
					<APIFormHeader style={{ color: "green" }}>
						{data.successMessage}
					</APIFormHeader>
				)}
			<FlexboxRow style={{ border: "1px solid var(--color-gray-700)" }}>
				<APIFormBtnsSelect>
					<APIFormBtnSelect
						onClick={() => {
							changePassword && setChangeEmail(true);
							setChangePassword(false);
						}}
						$selected={changeEmail ?? false}
					>
						Update Email Address
					</APIFormBtnSelect>
					<APIFormBtnSelect
						onClick={() => {
							changeEmail && setChangePassword(true);
							setChangeEmail(false);
						}}
						$selected={changePassword ?? false}
					>
						Update Password
					</APIFormBtnSelect>
				</APIFormBtnsSelect>
				{changeEmail && (
					<Form method="patch" style={{ width: "60%", padding: "0 20px" }}>
						<APIFormTextInputLabel type="email" name="old Email" value="" />
						<APIFormTextInputLabel type="email" name="new Email" value="" />
						<APIFormTextInputLabel
							type="email"
							name="confirm New Email"
							value=""
						/>
						<APIBtnSave>
							<button name={"accountEmail"}>Save</button>
						</APIBtnSave>
					</Form>
				)}
				{changePassword && (
					<Form method="patch" style={{ width: "60%", padding: "0 20px" }}>
						<APIFormTextInputLabel
							type="password"
							name="old Password"
							value=""
						/>
						<APIFormTextInputLabel
							type="password"
							name="new Password"
							value=""
						/>
						<APIFormTextInputLabel
							type="password"
							name="confirm New Password"
							value=""
						/>
						<APIBtnSave>
							<button name={"accountPassword"}>Save</button>
						</APIBtnSave>
					</Form>
				)}
			</FlexboxRow>
		</APIForm>
	);
};

export default AccountSettingsForm;

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
