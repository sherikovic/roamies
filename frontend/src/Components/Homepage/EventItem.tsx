import { Broadcast } from "types/broadcast";
import sherikovic from "../../images/sherikovic.jpg";
import rideshareimg from "../../images/rideshareicon.png";
import trekkingimg from "../../images/trekkingicon.png";
import tourimg from "../../images/touricon.png";
import sightseeingimg from "../../images/sightseeingicon.png";

import styles from "./EventItem.module.css";

interface EventItemProps {
	event: Broadcast;
	children?: React.ReactNode;
}

const EventItem: React.FC<EventItemProps> = (props) => {
	let imgType: string | undefined;

	props.event.category === "Ride share"
		? (imgType = rideshareimg)
		: props.event.category === "Nature"
		? (imgType = trekkingimg)
		: props.event.category === "Tour"
		? (imgType = tourimg)
		: props.event.category === "Sightseeing"
		? (imgType = sightseeingimg)
		: (imgType = undefined);

	return (
		<div className={styles.ei_layout}>
			<div className={styles.ei_header}>
				<a href="profile">
					<img
						src={sherikovic}
						alt="user profile"
						className={styles.user_profile_icon}
					/>
				</a>
				<div className={styles.ei_header_name_date}>
					<a href={`events/${props.event._id}`} id={styles.name}>
						{props.event.name}
					</a>
					<p id={styles.date}>
						{new Date(props.event.date.toString()).toLocaleDateString("en-US", {
							weekday: "short",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
				<img
					src={imgType}
					alt="event type"
					className={styles.event_type_icon}
				/>
			</div>
			<div className={styles.ei_content}>
				<p id={styles.description}>{props.event.description}</p>
			</div>
			<div className={styles.ei_footer}>
				<p id={styles.rsvp}>
					RSVP: {props.event.participants.length}/{props.event.rsvp.toString()}
				</p>
			</div>
		</div>
	);
};

export default EventItem;
