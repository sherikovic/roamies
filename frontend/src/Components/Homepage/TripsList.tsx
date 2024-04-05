import { Trip } from "types/trip";
import styles from "./TripsList.module.css";
import TripItem from "./TripItem";

import sliderRightArrow from "../../images/sliderrightarrow.png";
import sliderLeftArrow from "../../images/sliderleftarrow.png";
import rightArrowIcon from "../../images/rightarrow.png";
import { useRef } from "react";

interface TripsListProps {
	trips: Trip[];
	children?: React.ReactNode;
}

const TripsList: React.FC<TripsListProps> = (props) => {
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const slidingRef = useRef<number>(0);

	const slideLeft = () => {
		if (slidingRef.current !== 0) {
			slidingRef.current--;
			const width = (slidingRef.current * -90).toString() + "px";
			const slider = document.querySelector(`.${styles.tl_inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		}
		if (slidingRef.current === 0) {
			const leftArrow = document.querySelector(`.${styles.tl_left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 0.5; pointer-events: none");
			const rightArrow = document.querySelector(`.${styles.tl_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		} else if (slidingRef.current !== props.trips.length - 3) {
			const rightArrow = document.querySelector(`.${styles.tl_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		}
	};
	const slideRight = () => {
		if (slidingRef.current < props.trips.length - 3) {
			slidingRef.current === null
				? (slidingRef.current = 1)
				: slidingRef.current++;
			const width = (slidingRef.current * -90).toString() + "px";
			const slider = document.querySelector(`.${styles.tl_inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		} else if (slidingRef.current === props.trips.length - 3) {
			const scroll: number | undefined = sliderRef.current!.scrollWidth;
			const offset: number | undefined = sliderRef.current!.offsetWidth;
			const width =
				-(90 * (props.trips.length - 3) + (scroll - offset)).toString() + "px";
			const slider = document.querySelector(`.${styles.tl_inner_slider}`);
			slider?.setAttribute(
				"style",
				`transform: translateX(${width}); transition: transform 0.5s ease-in-out`
			);
		}
		if (
			slidingRef.current !== 0 &&
			slidingRef.current !== props.trips.length - 3
		) {
			const leftArrow = document.querySelector(`.${styles.tl_left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
			const rightArrow = document.querySelector(`.${styles.tl_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
		} else if (slidingRef.current === props.trips.length - 3) {
			const leftArrow = document.querySelector(`.${styles.tl_left_arrow}`);
			leftArrow?.setAttribute("style", "opacity: 1; cursor: pointer");
			const rightArrow = document.querySelector(`.${styles.tl_right_arrow}`);
			rightArrow?.setAttribute("style", "opacity: 0.5; pointer-events: none");
		}
	};

	return (
		<div className={styles.tl_body}>
			<div className={styles.tl_header}>
				<div className={styles.tl_header_info}>
					<h4>Trips</h4>
					<a href="/trips">
						Explore
						<img
							src={rightArrowIcon}
							alt="right arrow"
							className={styles.icon}
						/>
					</a>
				</div>
				<div className={styles.tl_slider_btns}>
					<div onClick={slideLeft}>
						<img
							src={sliderLeftArrow}
							alt="slider left arrow"
							className={styles.tl_left_arrow}
						/>
					</div>
					<div onClick={slideRight}>
						<img
							src={sliderRightArrow}
							alt="slider right arrow"
							className={styles.tl_right_arrow}
						/>
					</div>
				</div>
			</div>
			<section className={styles.tl_slider} ref={sliderRef}>
				<div className={styles.tl_inner_slider}>
					{props.trips.map((trip, index) => (
						<TripItem trip={trip} key={trip._id} index={index} />
					))}
				</div>
			</section>
		</div>
	);
};

export default TripsList;
