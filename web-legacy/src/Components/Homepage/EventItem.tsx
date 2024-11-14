import { Broadcast } from 'types/broadcast';
import sherikovic from '../../images/sherikovic.jpg';
import styled from 'styled-components/macro';
import {
  Img,
  EventItemNameDate,
  EventItemContent,
  EventItemFooter,
} from 'util/common_styles';
import rideShareIcon from '../../images/rideshareicon.png';
import natureIcon from '../../images/trekkingicon.png';
import tourIcon from '../../images/touricon.png';
import cityWalksIcon from '../../images/sightseeingicon.png';

interface EventItemProps {
  event: Broadcast;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  let imgType: string;
  switch (event.category) {
    case 'Ride Share':
      imgType = rideShareIcon;
      break;
    case 'Nature':
      imgType = natureIcon;
      break;
    case 'Tour':
      imgType = tourIcon;
      break;
    case 'City Walks':
      imgType = cityWalksIcon;
      break;
    default:
      imgType = '';
  }

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
          <a href={`events/${event._id}`}>{event.title}</a>
          <h6>
            {new Intl.DateTimeFormat('en', {
              dateStyle: 'short',
              timeStyle: 'short',
            }).format(new Date(event.datetime))}
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
        <h4>{event.description}</h4>
      </EventItemContent>
      <EventItemFooter>
        <h6>
          RSVP:{' '}
          {event.rsvp
            ? event.participants?.length + '/' + event.rsvp?.toString()
            : 'NA'}
        </h6>
        <a href={`events/${event._id}`}>+1</a>
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
