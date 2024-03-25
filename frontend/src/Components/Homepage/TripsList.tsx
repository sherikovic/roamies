import { Trip } from "types/trip";
import styles from "./TripsList.module.css";

interface TripsListProps {
	data: Trip[];
	children?: React.ReactNode;
}

const TripsList: React.FC<TripsListProps> = (props) => {
	return (
		<div className={styles.trips_list}>
			{props.data.map((trip) => (
				<div key={trip._id} className={styles.trip_item}>
					<p>{trip.name}</p>
				</div>
			))}
		</div>
	);
};

export default TripsList;
