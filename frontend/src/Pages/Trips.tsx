import { LoaderFunction, json, useLoaderData } from 'react-router-dom';
import TripsList from '../Components/TripsList';
import PageHeader from '../Components/PageHeader';
// import { Trip } from '../types/trip';
import { getAllTrips } from 'util/api';

const TripsPage: React.FC = () => {
	const tripsArray: any = useLoaderData();
	return (
		<div>
			<PageHeader headerText='Trips'>
				Save your keys, elements, codes,..etc
			</PageHeader>
			<TripsList trips={tripsArray} />
		</div>
	);
};

export default TripsPage;

export const loader: LoaderFunction = async () => {
	// const data: Trip = {
	// 	name: 'China',
	// 	location: 'China Mainland',
	// 	id: '11',
	// 	description: 'trip',
	// };
	// const res1 = createTrip({ data: data });
	// const res1: any = await getTrip('?id=65efae603c9d51d37e5fefa9');
	// const res1: any = await getAllTrips();
	// console.log(res1);
	const res: any = await getAllTrips();
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error?.message }, { status: res.error?.status });
	}
};
