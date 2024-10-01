import { SettingsInputField, SettingsInputLabel, SettingsItem } from './common_styles'

export const SettingsInputLabelCombo: React.FC<{
  type: string
  name: string
  value: string | undefined
}> = ({ type, name, value }) => {
  return (
    <SettingsItem>
      <SettingsInputField
        type={type}
        placeholder={name}
        name={name}
        id={name}
        defaultValue={value}
      />
      <SettingsInputLabel htmlFor={name}>{name.toUpperCase()}</SettingsInputLabel>
    </SettingsItem>
  )
}
