import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import TripsList from "../Components/Trip/TripsList";
import PageContent from "../Components/Misc/PageContent";
// import { Trip } from '../types/trip';
import { getAllTrips } from "util/api";

const TripsPage: React.FC = () => {
	const tripsArray: any = useLoaderData();
	return (
		<div>
			<PageContent headerText="Trips">
				Save your keys, elements, codes,..etc
				<TripsList trips={tripsArray} />
			</PageContent>
		</div>
	);
};

export default TripsPage;

export const loader: LoaderFunction = async () => {
	const res = await getAllTrips();
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
};
