import { LoaderFunction, Outlet, json, useLoaderData } from "react-router-dom";
import { getAllTrips } from "util/api";
import { Trip } from "types/trip";

const TripsPage: React.FC = () => {
	const tripsArray = useLoaderData() as Trip[];

	return (
		<div>
			{tripsArray.map((trip) => (
				<div key={trip._id}>
					<a href={`trips/${trip._id}`}>{trip.title}</a>
				</div>
			))}
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
