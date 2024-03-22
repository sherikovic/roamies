import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import PageContent from "../Components/Misc/PageContent";
import LocationsList from "../Components/Location/LocationsList";
import { Location } from "../types/location";

const LocationsPage: React.FC = () => {
	const locationsArray: any = useLoaderData();
	return (
		<div>
			<PageContent headerText="Locations">
				Show the world your most interesing locations...
			</PageContent>
			<LocationsList locations={locationsArray} />
		</div>
	);
};

export default LocationsPage;

export const loader: LoaderFunction = async ({ request, params }) => {
	const response = await fetch("http://localhost:8080/locations");
	if (!response.ok) {
		const resObj: {
			message: string;
			status: number;
		} = await response.json();
		throw json({ message: resObj.message }, { status: resObj.status });
	} else {
		const resObj: {
			locations: Location[];
		} = await response.json();
		return resObj.locations;
	}
};
