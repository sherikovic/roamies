import { ActionFunction } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import SettingsTabs from "../Components/SettingsTabs";

const SettingsPage: React.FC = () => {

    return (
        <div>
            <PageHeader headerText="Settings" >
                Update your settings
            </PageHeader>
            <SettingsTabs />
        </div>
    );
};

export default SettingsPage;

export const action: ActionFunction = async ({ request, params }) => {
    const data = await request.formData();

    const FormData = {
        name: data.get('full name'),
        city: data.get('city'),
        country: data.get('country'),
        github: data.get('github'),
        linkedin: data.get('linkedin')
    };

    if (FormData.name === "") {
        return { name: "At least name field is required!" }
    }

    let url = 'http://localhost:8080/user-info';
}
