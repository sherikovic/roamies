import {
	SettingsInputField,
	SettingsInputLabel,
	SettingsItem,
} from "./common_styles";

export const SettingsInputLabelCombo: React.FC<{
	type: string;
	name: string;
	value?: string;
	classDiv?: string;
	classInput?: string;
	classLabel?: string;
	children?: React.ReactNode;
}> = (props) => {
	return (
		<SettingsItem>
			<SettingsInputField
				type={props.type}
				placeholder={props.name}
				name={props.name}
				id={props.name}
				defaultValue={props.value}
			/>
			<SettingsInputLabel htmlFor={props.name}>
				{props.name.toUpperCase()}
			</SettingsInputLabel>
		</SettingsItem>
	);
};
