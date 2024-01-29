import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import LocationsList from "../Components/LocationsList";
import LocationModel from "../models/location";

const LocationsPage: React.FC = () => {
    const locationsArray: any = useLoaderData();
    return (
        <div>
            <PageHeader headerText="Locations">
                Show the world your most interesing locations...
            </PageHeader>
            <LocationsList locations={locationsArray} />
        </div>
    );
};

export default LocationsPage;

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await fetch('http://localhost:8080/locations');
    if (!response.ok) {
        const resObj: {
            message: string,
            status: number
        } = await response.json();
        throw json(
            { message: resObj.message },
            { status: resObj.status }
        )
    } else {
        const resObj: {
            locations: LocationModel[]
        } = await response.json();
        return resObj.locations;
    }
};