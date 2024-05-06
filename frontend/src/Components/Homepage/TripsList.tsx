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
	const [remainingDistance, setRemainingDistance] = useState(0);
	const [traveledDistance, setTraveledDistance] = useState(0);
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
		const slidingDistance = sliderRef.current!.scrollWidth / props.trips.length;
		// the purpose here is to check if there is only an item and a half to slide through
		// 20 is padding that was added in the last step
		if (traveledDistance - slidingDistance < slidingDistance) {
			setTranslateVal(0);
			setTraveledDistance(0);
			setRemainingDistance(0);
			setOpacity((prev) => ({ ...prev, left: 0.5, right: 1 }));
			setCursor((prev) => ({ ...prev, left: "default", right: "pointer" }));
		} else {
			const offset =
				traveledDistance -
				slidingDistance * Math.floor(traveledDistance / slidingDistance);
			const travelingDistance = traveledDistance - slidingDistance - offset;
			setTranslateVal(travelingDistance * -1);
			setTraveledDistance(travelingDistance);
			setOpacity((prev) => ({ ...prev, left: 1, right: 1 }));
			setCursor((prev) => ({ ...prev, left: "pointer", right: "pointer" }));
		}
	};
	const slideRight = () => {
		const offsetWidth = sliderRef.current!.offsetWidth;
		const totalRemainingDistance = sliderRef.current!.scrollWidth - offsetWidth;
		const slidingDistance = sliderRef.current!.scrollWidth / props.trips.length;
		if (traveledDistance < totalRemainingDistance) {
			if (
				remainingDistance > slidingDistance ||
				(traveledDistance === 0 && totalRemainingDistance > slidingDistance)
			) {
				const travelingDistance = traveledDistance + slidingDistance;
				setTranslateVal(travelingDistance * -1);
				setTraveledDistance(travelingDistance);
				setRemainingDistance(totalRemainingDistance - travelingDistance);
				setOpacity((prev) => ({ ...prev, left: 1, right: 1 }));
				setCursor((prev) => ({ ...prev, left: "pointer", right: "pointer" }));
			} else {
				const travelingDistance =
					traveledDistance !== 0
						? traveledDistance + remainingDistance + 20
						: totalRemainingDistance + 20; // 20 for padding
				setTranslateVal(travelingDistance * -1);
				setTraveledDistance(travelingDistance);
				setRemainingDistance(sliderRef.current!.scrollWidth - offsetWidth + 20);
				setOpacity((prev) => ({ ...prev, left: 1, right: 0.5 }));
				setCursor((prev) => ({ ...prev, left: "pointer", right: "default" }));
			}
		}
	};

	return (
		<TripsListPage>
			<TripsListPageHeader>
				<EventsListHeaderText>
					<h4>Trips</h4>
					<a href="trips">
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
			<SliderContents>
				<InnerSlider $translate={translateVal} ref={sliderRef}>
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
