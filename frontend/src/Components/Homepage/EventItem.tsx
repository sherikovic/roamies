import { Broadcast } from "types/broadcast";
import sherikovic from "../../images/sherikovic.jpg";
import styled from "styled-components/macro";
import {
  Img,
  EventItemNameDate,
  EventItemContent,
  EventItemFooter,
} from "styles";

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
    <EventContainer>
      <EventItemHeader>
        <a href="profile">
          <StyledImg
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
        <StyledImg
          src={imgType}
          alt="event type"
          $height={25}
          $width={25}
          $br={0}
        />
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
        <a href={`events/${props.event._id}`}>+1</a>
      </EventItemFooter>
    </EventContainer>
  );
};

export default EventItem;

const EventContainer = styled.div`
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

const StyledImg = styled(Img)`
  position: relative;
`;
