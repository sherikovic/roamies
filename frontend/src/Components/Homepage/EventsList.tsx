import { Broadcast } from "types/broadcast";
import styles from "./EventsList.module.css";
import EventItem from "./EventItem";

import sliderRightArrow from "../../images/sliderrightarrow.png";
import sliderLeftArrow from "../../images/sliderleftarrow.png";
import rightArrowIcon from "../../images/rightarrow.png";
import { useRef } from "react";

interface EventsListProps {
	data: Broadcast[];
	children?: React.ReactNode;
}

const EventsList: React.FC<EventsListProps> = (props) => {
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const slidingRef = useRef<number>(0);

	const slideLeft = () => {
		if (slidingRef.current !== 0) {
			slidingRef.current--;
			const width = (slidingRef.current * -270).toString() + "px";
			const slider = document.querySelector(`.${styles.inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		}
		if (slidingRef.current === 0) {
			const leftArrow = document.querySelector(`.${styles.left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 0.5; pointer-events: none");
		} else if (slidingRef.current !== props.data.length - 3) {
			const rightArrow = document.querySelector(`.${styles.right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		}
	};
	const slideRight = () => {
		console.log(slidingRef.current, props.data.length);
		if (slidingRef.current < props.data.length - 3) {
			slidingRef.current === null
				? (slidingRef.current = 1)
				: slidingRef.current++;
			const width = (slidingRef.current * -270).toString() + "px";
			const slider = document.querySelector(`.${styles.inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		} else if (slidingRef.current === props.data.length - 3) {
			console.log("NOW");
			const scroll: number | undefined = sliderRef.current!.scrollWidth;
			const offset: number | undefined = sliderRef.current!.offsetWidth;
			const width =
				-(270 * (props.data.length - 3) + (scroll - offset)).toString() + "px";
			const slider = document.querySelector(`.${styles.inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		}
		if (
			slidingRef.current !== 0 &&
			slidingRef.current !== props.data.length - 3
		) {
			const leftArrow = document.querySelector(`.${styles.left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		} else if (slidingRef.current === props.data.length - 3) {
			const rightArrow = document.querySelector(`.${styles.right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 0.5; pointer-events: none");
		}
	};

	return (
		<div className={styles.events_layout}>
			<div className={styles.events_header}>
				<div className={styles.events_header_info}>
					<h4>Events</h4>
					<a href="/events">
						Explore
						<img
							src={rightArrowIcon}
							alt="right arrow"
							className={styles.icon}
						/>
					</a>
				</div>
				<div className={styles.slider_btns}>
					<div onClick={slideLeft}>
						<img
							src={sliderLeftArrow}
							alt="slider left arrow"
							className={styles.left_arrow}
						/>
					</div>
					<div onClick={slideRight}>
						<img
							src={sliderRightArrow}
							alt="slider right arrow"
							className={styles.right_arrow}
						/>
					</div>
				</div>
			</div>
			<section className={styles.slider} ref={sliderRef}>
				<div className={styles.inner_slider}>
					{props.data.map((event) => (
						<EventItem event={event} key={event._id} />
					))}
				</div>
			</section>
		</div>
	);
};

export default EventsList;
