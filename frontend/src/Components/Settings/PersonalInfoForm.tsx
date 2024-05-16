import { Form, useActionData } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "util/auth-context";
import {
	SettingsBtnSave,
	SettingsForm,
	SettingsHeader,
	SettingsInputsRow,
	FlexboxRow,
} from "util/common_styles";
import { SettingsInputLabelCombo } from "util/common_components";

interface PersonalInfoFormProps {
	children?: React.ReactNode;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
	const data: any = useActionData();
	const { userInfo, updateUserInfo } = useContext(AuthContext);
	// const userData = userContext.userInfo as User;
	const fileInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (data && data.ok) {
			// const updateUser = userContext.updateUserInfo;
			updateUserInfo(data.data, userInfo);
		}
	}, [data, updateUserInfo, userInfo]);

	return (
		<Form method="patch">
			<SettingsForm>
				<SettingsHeader>Update your personal information</SettingsHeader>
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
					<SettingsHeader style={{ color: "orange" }}>
						{data.errorMessage}
					</SettingsHeader>
				)}
				{data && data.successMessage && data.type === "personal" && (
					<SettingsHeader style={{ color: "green" }}>
						{data.successMessage}
					</SettingsHeader>
				)}
				<SettingsInputsRow>
					<SettingsInputLabelCombo
						type="text"
						name="first name"
						value={userInfo ? userInfo.firstname : ""}
					/>
					<SettingsInputLabelCombo
						type="text"
						name="last name"
						value={userInfo ? userInfo!.lastname : ""}
					/>
				</SettingsInputsRow>
				<SettingsInputsRow>
					<SettingsInputLabelCombo
						type="text"
						name="age"
						value={userInfo ? userInfo!.age : ""}
					/>
					<SettingsInputLabelCombo
						type="text"
						name="country"
						value={userInfo ? userInfo!.country : ""}
					/>
				</SettingsInputsRow>
				<SettingsInputLabelCombo
					type="textarea"
					name="bio"
					value={userInfo ? userInfo!.bio : ""}
				/>
				<SettingsHeader>Socials</SettingsHeader>
				<SettingsInputsRow>
					<SettingsInputLabelCombo
						type="text"
						name="instagram"
						value={userInfo ? userInfo!.social?.instagram : ""}
					/>
					<SettingsInputLabelCombo
						type="text"
						name="twitter"
						value={userInfo ? userInfo!.social?.twitter : ""}
					/>
				</SettingsInputsRow>
				<SettingsBtnSave>
					<button name={"personal"}>Save</button>
				</SettingsBtnSave>
			</SettingsForm>
		</Form>
	);
};

export default PersonalInfoForm;
