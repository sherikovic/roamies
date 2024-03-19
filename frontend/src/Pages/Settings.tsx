import {
	ActionFunction,
	LoaderFunction,
	json,
	useLoaderData,
	useRouteLoaderData,
} from 'react-router-dom';
import PageContent from '../Components/PageContent';
import SettingsTabs from '../Components/SettingsTabs';
import { Element } from '../types/element';

const SettingsPage: React.FC = () => {
	const logIn = useRouteLoaderData('root');
	const userData: { user: Element } | any = useLoaderData();

	return (
		<>
			{logIn ? (
				<div>
					<PageContent headerText='Settings'>Update your settings</PageContent>
					<SettingsTabs userData={userData.user} />
				</div>
			) : (
				<div>
					<h4 style={{ textAlign: 'center' }}>
						You are not authorized to view this page!
					</h4>
				</div>
			)}
		</>
	);
};

export default SettingsPage;

export const action: ActionFunction = async ({ request, params }) => {
	const data = await request.formData();

	let FormData: any = {};

	if (data.get('personal') === '') {
		FormData = {
			fullname: data.get('full name'),
			city: data.get('city'),
			country: data.get('country'),
			github: data.get('github'),
			linkedin: data.get('linkedin'),
			type: 'personal',
		};

		if (FormData.fullname === '') {
			return {
				errorMessage: 'At least name field is required!',
				type: FormData.type,
			};
		}
	} else if (data.get('accountEmail') === '') {
		FormData = {
			oldEmail: data.get('old Email'),
			newEmail: data.get('new Email'),
			confirmNewEmail: data.get('confirm New Email'),
			type: 'email',
		};
	} else if (data.get('accountPassword') === '') {
		FormData = {
			oldPassword: data.get('old Password'),
			newPassword: data.get('new Password'),
			confirmNewPassword: data.get('confirm New Password'),
			type: 'password',
		};
	}
	const response = await fetch(
		'http://localhost:8080/settings/updateuserpersonalinfo',
		{
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(FormData),
		}
	);

	if (response.ok) {
		const resData = await response.json();
		return {
			successMessage: resData.message,
			type: FormData.type,
		};
	} else {
		const status = response.status;
		const resData = await response.json();
		if (status === 500) {
			throw json({ message: resData.message }, { status });
		} else if (status === 501) {
			return {
				errorMessage: resData.message,
				type: FormData.type,
			};
		} else if (status === 502) {
			return {
				errorMessage: resData.message,
				type: FormData.type,
			};
		}
	}
};

export const loader: LoaderFunction = async ({ request, params }) => {
	const response = await fetch(
		'http://localhost:8080/settings/getuserpersonalinfo',
		{
			credentials: 'include',
		}
	);
	if (response.ok) {
		return response;
	} else {
		const status = response.status;
		const resData = await response.json();
		throw json({ message: resData.message }, { status });
	}
};
