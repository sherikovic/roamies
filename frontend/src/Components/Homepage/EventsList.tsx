import { Broadcast } from "types/broadcast";
import styles from "./EventsList.module.css";
import EventItem from "./EventItem";

import sliderRightArrow from "../../images/sliderrightarrow.png";
import sliderLeftArrow from "../../images/sliderleftarrow.png";
import { useState } from "react";

interface EventsListProps {
	data: Broadcast[];
	children?: React.ReactNode;
}

const EventsList: React.FC<EventsListProps> = (props) => {
	const [leftSlide, setLeftSlide] = useState(false);
	const [rightSlide, setRightSlide] = useState(false);

	return (
		<div className={styles.events_slider}>
			<img
				src={sliderLeftArrow}
				alt="slider left arrow"
				className={styles.slider_arrows}
				id={styles.left}
				onClick={() => setLeftSlide(true)}
			/>
			<div className={styles.events_list}>
				{props.data.map((event) => (
					<div
						className={
							leftSlide
								? `${styles.event_item} ${styles.slideLeft}`
								: rightSlide
								? `${styles.event_item} ${styles.slideRight}`
								: styles.event_item
						}
					>
						<EventItem event={event} />
					</div>
				))}
			</div>
			<img
				src={sliderRightArrow}
				alt="slider right arrow"
				className={styles.slider_arrows}
				id={styles.right}
				onClick={() => setRightSlide(true)}
			/>
		</div>
	);
};

export default EventsList;
