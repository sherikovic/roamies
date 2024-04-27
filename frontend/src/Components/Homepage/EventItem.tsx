import { Broadcast } from "types/broadcast";
import sherikovic from "../../images/sherikovic.jpg";
import styled from "styled-components";

interface EventItemProps {
	event: Broadcast;
	children?: React.ReactNode;
}

const EventItem: React.FC<EventItemProps> = (props) => {
	let imgType: string | undefined;

	props.event.category === "Ride Share"
		? (imgType = require("../../images/rideshareicon.png"))
		: props.event.category === "Nature"
		? (imgType = require("../../images/trekkingicon.png"))
		: props.event.category === "Tour"
		? (imgType = require("../../images/touricon.png"))
		: props.event.category === "City Walks"
		? (imgType = require("../../images/sightseeingicon.png"))
		: (imgType = undefined);

	return (
		<EventItemLayout>
			<EventItemHeader>
				<a href="profile">
					<Img
						src={sherikovic}
						alt="user profile"
						$height={35}
						$width={35}
						$br={25}
					/>
				</a>
				<EventItemNameDate>
					<a href={`events/${props.event._id}`}>{props.event.title}</a>
					<h6>
						{new Intl.DateTimeFormat("en", {
							dateStyle: "short",
							timeStyle: "short",
						}).format(new Date(props.event.datetime))}
					</h6>
				</EventItemNameDate>
				<Img src={imgType} alt="event type" $height={25} $width={25} $br={0} />
			</EventItemHeader>
			<EventItemContent>
				<h4>{props.event.description}</h4>
			</EventItemContent>
			<EventItemFooter>
				<h6>
					RSVP:{" "}
					{props.event.rsvp
						? props.event.participants?.length +
						  "/" +
						  props.event.rsvp?.toString()
						: "NA"}
				</h6>
			</EventItemFooter>
		</EventItemLayout>
	);
};

export default EventItem;

const EventItemLayout = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 20px;
	width: 250px;
	min-width: 250px;
	min-height: 170px;
	padding: 10px;
	border-radius: 8px;
	background-color: #f4f0f0;
`;

const EventItemHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	> a {
		margin-right: 10px;
		padding: 0px;
		font-size: 14px;
	}
`;

const Img = styled.img<{ $height: number; $width: number; $br: number }>`
	height: ${(p) => p.$height}px;
	width: ${(p) => p.$width}px;
	min-height: 18px;
	min-width: 18px;
	text-indent: 0px;
	position: relative;
	border-radius: ${(p) => p.$br}px;
`;

const EventItemNameDate = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
	> a {
		font-size: 14px;
		padding: 0px;
		font-weight: 550;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-decoration: none;
		color: black;
	}
	> h6 {
		font-size: 13px;
		color: grey;
		margin: 0px;
		font-weight: normal;
		line-height: 15px;
	}
`;

const EventItemContent = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 10px;
	height: 100%;
	> h4 {
		padding: 0px;
		margin: 0;
		font-size: 14px;
		font-weight: normal;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`;

const EventItemFooter = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	> h6 {
		font-size: 11px;
		font-weight: normal;
		padding: 0px;
		margin: 0;
	}
`;
