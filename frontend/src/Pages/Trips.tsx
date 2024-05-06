import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import { getAllTrips } from "util/api";
import { Trip } from "types/trip";
import styled from "styled-components";
import { FlexboxCol } from "util/common_styles";

const TripsPage: React.FC = () => {
	const tripsArray = useLoaderData() as Trip[];

	return (
		<FlexboxCol>
			{tripsArray.map((trip) => (
				<TripLayout key={trip._id}>
					<div>{/* images */}</div>
					<FlexboxCol>
						<a href={`trips/${trip._id}`}>{trip.title}</a>
						{trip.description}
					</FlexboxCol>
				</TripLayout>
			))}
		</FlexboxCol>
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

const TripLayout = styled.div`
	display: flex;
	border: 1px solid grey;
	margin-bottom: 10px;
	padding: 10px;
`;
