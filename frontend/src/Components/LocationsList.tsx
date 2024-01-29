import { Link, useRouteLoaderData } from "react-router-dom";
import LocationModel from "../models/location";
import classes from './LocationsList.module.css';

interface LocationsListProps {
    locations: LocationModel[];
    children?: React.ReactNode;
}

const LocationsList: React.FC<LocationsListProps> = (props) => {
    const data: any = useRouteLoaderData("root");

    return (
        <div>
            <div className={classes.locations}>
                <ul className={classes.list}>
                    {props.locations.map((location: LocationModel) => (
                        <li key={location._id} className={classes.item}>
                            <Link to={location._id} className={classes.content}>
                                <h4>{location.name}</h4>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {data && data.user && (
                <div className={classes.new}>
                    <Link to="new">+ New Location</Link>
                </div>
            )}
        </div>
    );
}

export default LocationsList;