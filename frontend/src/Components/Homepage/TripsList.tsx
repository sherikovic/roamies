import { Trip } from "types/trip";
import TripItem from "./TripItem";

import sliderRightArrow from "../../images/sliderrightarrow.png";
import sliderLeftArrow from "../../images/sliderleftarrow.png";
import rightArrowIcon from "../../images/rightarrow.png";
import { useRef, useState } from "react";
import styled from "styled-components";
import { FlexboxRow, SliderBtn } from "util/common_styles";

interface TripsListProps {
	trips: Trip[];
	children?: React.ReactNode;
}

const TripsList: React.FC<TripsListProps> = (props) => {
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const slidingRef = useRef<number>(0);
	const [translateVal, setTranslateVal] = useState(0);
	const [opacity, setOpacity] = useState({
		left: 0.5,
		right: 1,
	});
	const [cursor, setCursor] = useState({
		left: "default",
		right: "pointer",
	});

	const slideLeft = () => {
		if (slidingRef.current !== 0) {
			slidingRef.current--;
			setTranslateVal(slidingRef.current * -90);
		}
		if (slidingRef.current === 0) {
			setOpacity((prev) => ({ ...prev, left: 0.5, right: 1 }));
			setCursor((prev) => ({ ...prev, left: "default", right: "pointer" }));
		} else if (slidingRef.current !== props.trips.length - 3) {
			setOpacity((prev) => ({ ...prev, right: 1 }));
			setCursor((prev) => ({ ...prev, right: "pointer" }));
		}
	};
	const slideRight = () => {
		if (slidingRef.current < props.trips.length - 3) {
			slidingRef.current === null
				? (slidingRef.current = 1)
				: slidingRef.current++;
			setTranslateVal(slidingRef.current * -90);
		} else if (slidingRef.current === props.trips.length - 3) {
			const scroll: number | undefined = sliderRef.current!.scrollWidth;
			const offset: number | undefined = sliderRef.current!.offsetWidth;
			const width = -(90 * (props.trips.length - 3) + (scroll - offset));
			setTranslateVal(width);
		}
		if (
			slidingRef.current !== 0 &&
			slidingRef.current !== props.trips.length - 3
		) {
			setOpacity((prev) => ({ ...prev, left: 1, right: 1 }));
			setCursor((prev) => ({ ...prev, left: "pointer", right: "pointer" }));
		} else if (slidingRef.current === props.trips.length - 3) {
			setOpacity((prev) => ({ ...prev, left: 1, right: 0.5 }));
			setCursor((prev) => ({ ...prev, left: "pointer", right: "default" }));
		}
	};

	return (
		<TripsListPage>
			<TripsListPageHeader>
				<EventsListHeaderText>
					<h4>Trips</h4>
					<a href="/trips">
						Explore
						<img src={rightArrowIcon} alt="right arrow" />
					</a>
				</EventsListHeaderText>
				<FlexboxRow style={{ justifyContent: "flex-end" }}>
					<SliderBtn
						onClick={slideLeft}
						$opacity={opacity.left}
						$cursor={cursor.left}
					>
						<img src={sliderLeftArrow} alt="slider left arrow" />
					</SliderBtn>
					<SliderBtn
						onClick={slideRight}
						$opacity={opacity.right}
						$cursor={cursor.right}
					>
						<img src={sliderRightArrow} alt="slider right arrow" />
					</SliderBtn>
				</FlexboxRow>
			</TripsListPageHeader>
			<SliderContents ref={sliderRef}>
				<InnerSlider $translate={translateVal}>
					{props.trips.map((trip, index) => (
						<TripItem trip={trip} key={trip._id} index={index} />
					))}
				</InnerSlider>
			</SliderContents>
		</TripsListPage>
	);
};

export default TripsList;

const TripsListPage = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid #c2c2d1;
	border-radius: 8px;
	padding: 0px;
	margin-bottom: 25px;
	overflow: hidden;
	background-color: white;
`;

const TripsListPageHeader = styled.section`
	display: flex;
	margin: 10px 0 10px 0;
	justify-content: space-between;
	align-items: center;
`;

const EventsListHeaderText = styled.div`
	display: flex;
	align-items: center;
	> h4 {
		display: inline-flex;
		font-size: 15px;
		font-weight: 550;
		margin: 0;
		padding: 0px 15px 0px 20px;
	}
	> a {
		display: flex;
		font-size: 13px;
		text-decoration: none;
		color: black;
	}
`;

const SliderContents = styled.section`
	overflow: hidden;
	padding-bottom: 20px;
`;

const InnerSlider = styled.div<{ $translate: number }>`
	display: flex;
	padding: 0 20px 0 20px;
	transform: translateX(${(p) => p.$translate}px);
	transition: transform 0.5s ease-in-out;
`;
