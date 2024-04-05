import { Broadcast } from "types/broadcast";
import styles from "./EventsList.module.css";
import EventItem from "./EventItem";

import sliderRightArrow from "../../images/sliderrightarrow.png";
import sliderLeftArrow from "../../images/sliderleftarrow.png";
import rightArrowIcon from "../../images/rightarrow.png";
import { useRef } from "react";

interface EventsListProps {
	events: Broadcast[];
	children?: React.ReactNode;
}

const EventsList: React.FC<EventsListProps> = (props) => {
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const slidingRef = useRef<number>(0);

	const slideLeft = () => {
		if (slidingRef.current !== 0) {
			slidingRef.current--;
			const width = (slidingRef.current * -270).toString() + "px";
			const slider = document.querySelector(`.${styles.el_inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		}
		if (slidingRef.current === 0) {
			const leftArrow = document.querySelector(`.${styles.el_left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 0.5; pointer-events: none");
			const rightArrow = document.querySelector(`.${styles.el_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		} else if (slidingRef.current !== props.events.length - 3) {
			const rightArrow = document.querySelector(`.${styles.el_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		}
	};
	const slideRight = () => {
		if (slidingRef.current < props.events.length - 3) {
			slidingRef.current === null
				? (slidingRef.current = 1)
				: slidingRef.current++;
			const width = (slidingRef.current * -270).toString() + "px";
			const slider = document.querySelector(`.${styles.el_inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		} else if (slidingRef.current === props.events.length - 3) {
			const scroll: number | undefined = sliderRef.current!.scrollWidth;
			const offset: number | undefined = sliderRef.current!.offsetWidth;
			const width =
				-(270 * (props.events.length - 3) + (scroll - offset)).toString() +
				"px";
			const slider = document.querySelector(`.${styles.el_inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		}
		if (
			slidingRef.current !== 0 &&
			slidingRef.current !== props.events.length - 3
		) {
			const leftArrow = document.querySelector(`.${styles.el_left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
			const rightArrow = document.querySelector(`.${styles.el_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		} else if (slidingRef.current === props.events.length - 3) {
			const leftArrow = document.querySelector(`.${styles.left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
			const rightArrow = document.querySelector(`.${styles.el_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 0.5; pointer-events: none");
		}
	};

	return (
		<div className={styles.el_body}>
			<div className={styles.el_header}>
				<div className={styles.el_header_info}>
					<h4>Events</h4>
					<a href="/events">
						Explore
						<img src={rightArrowIcon} alt="explore arrow" />
					</a>
				</div>
				<div className={styles.el_slider_btns}>
					<div onClick={slideLeft}>
						<img
							src={sliderLeftArrow}
							alt="slider left arrow"
							className={styles.el_left_arrow}
						/>
					</div>
					<div onClick={slideRight}>
						<img
							src={sliderRightArrow}
							alt="slider right arrow"
							className={styles.el_right_arrow}
						/>
					</div>
				</div>
			</div>
			<section className={styles.el_slider} ref={sliderRef}>
				<div className={styles.el_inner_slider}>
					{props.events.map((event) => (
						<EventItem event={event} key={event._id} />
					))}
				</div>
			</section>
		</div>
	);
};

export default EventsList;
