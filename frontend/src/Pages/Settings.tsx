import {
    ActionFunction,
    LoaderFunction,
    json,
    redirect,
    useLoaderData,
    useRouteLoaderData
} from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import SettingsTabs from "../Components/SettingsTabs";
import ElementModel from '../models/element';

const SettingsPage: React.FC = () => {
    const data: any = useRouteLoaderData('root');
    const userData: { user: ElementModel } | any = useLoaderData();

    return (
        <>
            {
                data && data.user ?
                    <div>
                        <PageHeader headerText="Settings" >
                            Update your settings
                        </PageHeader>
                        <SettingsTabs userData={userData.user} />
                    </div> :
                    <div>
                        <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
                    </div>
            }
        </>
    );
};

export default SettingsPage;

export const action: ActionFunction = async ({ request, params }) => {
    const data = await request.formData();

    const FormData = {
        fullname: data.get('full name'),
        city: data.get('city'),
        country: data.get('country'),
        github: data.get('github'),
        linkedin: data.get('linkedin'),
        // type: (data.get('personal') === '' && 'personal') || (data.get('account') === '' && 'account')
    };

    if (FormData.fullname === "") {
        return { fullname: "At least name field is required!" }
    }

    const response = await fetch('http://localhost:8080/settings/updateuserpersonalinfo', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
    });

    if (response.ok) {
        return redirect('/settings');
    } else {
        const status = response.status;
        const resData = await response.json();
        throw json({ message: resData.message }, { status });
    }
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await fetch('http://localhost:8080/settings/getuserpersonalinfo', {
        credentials: 'include'
    });
    if (response.ok) {
        return response;
    } else {
        const status = response.status;
        const resData = await response.json();
        throw json({ message: resData.message }, { status });
    }
};
