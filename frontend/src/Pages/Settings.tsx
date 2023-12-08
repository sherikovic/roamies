import PersonalInfoForm from "../Components/PersonalInfoForm";
import AccountSettingsForm from "../Components/AccountSettingsForm";
import PageHeader from "../Components/PageHeader";

const SettingsPage: React.FC = () => {

    return (
        <div>
            <PageHeader headerText="Settings" />
            <PersonalInfoForm />
            <AccountSettingsForm />
        </div>
    );
};

export default SettingsPage;
