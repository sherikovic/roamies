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
		<div className={styles.ei_body}>
			<div className={styles.ei_header}>
				<a href="profile">
					<img
						src={sherikovic}
						alt="user profile"
						className={styles.ei_userprofile_icon}
					/>
				</a>
				<div className={styles.ei_header_name_date}>
					<a href={`events/${props.event._id}`} id={styles.name}>
						{props.event.name}
					</a>
					<h6 id={styles.date}>
						{new Date(props.event.date.toString()).toLocaleDateString("en-US", {
							weekday: "short",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</h6>
				</div>
				<img src={imgType} alt="event type" className={styles.ei_type_icon} />
			</div>
			<div className={styles.ei_content}>
				<h4 id={styles.description}>{props.event.description}</h4>
			</div>
			<div className={styles.ei_footer}>
				<h6 id={styles.rsvp}>
					RSVP: {props.event.participants.length}/{props.event.rsvp.toString()}
				</h6>
			</div>
		</div>
	);
};

export default EventItem;
