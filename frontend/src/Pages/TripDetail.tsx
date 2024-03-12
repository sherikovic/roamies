import {
	ActionFunction,
	LoaderFunction,
	json,
	redirect,
	useRouteLoaderData,
} from 'react-router-dom';

import TripItem from '../Components/TripItem';

const TripDetailPage: React.FC = () => {
	const tripData: any = useRouteLoaderData('trip-detail');
	return <TripItem tripData={tripData} />;
};

export default TripDetailPage;

export const loader: LoaderFunction = async ({ request, params }) => {
	const id = params.id;
	const response = await fetch('http://localhost:8080/trips/' + id);
	if (!response.ok) {
		throw json({ message: 'Could not fetch trip details!' }, { status: 500 });
	} else {
		const resObj = await response.json();
		return resObj.trip;
	}
};

export const action: ActionFunction = async ({ request, params }) => {
	const id = params.id;
	const response = await fetch('http://localhost:8080/trips/' + id, {
		method: request.method,
	});
	if (!response.ok) {
		throw json({ message: "Couldn't delete trip" }, { status: 500 });
	}
	return redirect('/trips');
};
