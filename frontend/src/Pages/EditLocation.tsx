import { useRouteLoaderData } from "react-router-dom";
import LocationForm from "../Components/LocationForm";

const EditLocationPage: React.FC = () => {
    const locationData: any = useRouteLoaderData('location-detail');
    const data: any = useRouteLoaderData('root');

    return (
        <div>
            {data && data.user ? <LocationForm method='patch' data={locationData} /> :
                <div>
                    <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
                </div>
            }

        </div>
    )
}

export default EditLocationPage;
