import {
	ActionFunction,
	LoaderFunction,
	json,
	redirect,
	useRouteLoaderData,
} from 'react-router-dom';

import TripItem from '../Components/Trip/TripItem';
import { deleteTrip, getTrip } from 'util/api';

const TripDetailPage: React.FC = () => {
	const tripData: any = useRouteLoaderData('trip-detail');
	return <TripItem tripData={tripData} />;
};

export default TripDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const id: any = params.id;
	const res = await getTrip(id);
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: 500 });
	}
};

export const action: ActionFunction = async ({ params }) => {
	const id: any = params.id;
	const res = await deleteTrip(id);

	if (res.error) {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
	return redirect('/trips');
};
