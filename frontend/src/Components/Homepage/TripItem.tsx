import { Trip } from "types/trip";
import sherikovic from "../../images/sherikovic.jpg";
import china from "../../images/china.jpg";

import styles from "./TripItem.module.css";

interface TripItemProps {
	trip: Trip;
	index: number;
	children?: React.ReactNode;
}

const TripItem: React.FC<TripItemProps> = (props) => {
	return (
		<div className={styles.ti_body}>
			{/* <div className={styles.ti_bg_image}>
				<img src={china} alt="trip cover" />
			</div> */}
			<div className={styles.ti_content}>
				<a href={`trips/${props.trip._id}`} className={styles.name}>
					{props.trip.name}
				</a>
				<p className={styles.description}>{props.trip.description}</p>
				<div>
					<h6 className={styles.date}>
						{new Date(props.trip.startdate.toString()).toLocaleDateString(
							"en-US",
							{
								// weekday: "short",
								year: "2-digit",
								month: "short",
								day: "numeric",
							}
						) +
							" - " +
							new Date(props.trip.enddate!.toString()).toLocaleDateString(
								"en-US",
								{
									// weekday: "short",
									year: "2-digit",
									month: "short",
									day: "numeric",
								}
							)}
					</h6>
				</div>
			</div>
		</div>

		// <div className={styles.trip_item}>
		// 	<div className={styles.trip_image}>
		// 		<img src={china} alt="trip icon" />
		// 	</div>
		// 	<div className={styles.trip_content}>
		// 		<a href={`trips/${props.trip._id}`} id={styles.name}>
		// 			{props.trip.name}
		// 		</a>
		// 		<h6 id={styles.date}>
		// 			{new Date(props.trip.startdate.toString()).toLocaleDateString(
		// 				"en-US",
		// 				{
		// 					// weekday: "short",
		// 					year: "2-digit",
		// 					month: "short",
		// 					day: "numeric",
		// 				}
		// 			) +
		// 				" - " +
		// 				new Date(props.trip.enddate.toString()).toLocaleDateString(
		// 					"en-US",
		// 					{
		// 						// weekday: "short",
		// 						year: "2-digit",
		// 						month: "short",
		// 						day: "numeric",
		// 					}
		// 				)}
		// 		</h6>
		// 		<p id={styles.description}>{props.trip.description}</p>
		// 	</div>
		// </div>
	);
};

export default TripItem;
