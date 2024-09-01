import { Trip } from 'types/trip'
import styled from 'styled-components/macro'

interface TripItemProps {
  trip: Trip
  key: string
}

const TripItem: React.FC<TripItemProps> = ({ trip, key }) => {
  return (
    <TripItemLayout key={key}>
      {/* <div style={{width: "100%"}}>
				<img src={china} alt="trip cover" style={{width: "100%", height: "100%"}} />
			</div> */}
      <TripItemContents>
        <a href={`trips/${trip._id}`}>{trip.title}</a>
        <p>{trip.description}</p>
        <h6>
          {trip.endDate
            ? new Intl.DateTimeFormat('en', {
                dateStyle: 'short',
              }).format(new Date(trip.startDate)) +
              '-' +
              new Intl.DateTimeFormat('en', {
                dateStyle: 'short',
              }).format(new Date(trip.endDate))
            : new Intl.DateTimeFormat('en', {
                dateStyle: 'short',
              }).format(new Date(trip.startDate))}
        </h6>
      </TripItemContents>
    </TripItemLayout>
  )
}

export default TripItem

const TripItemLayout = styled.div`
  display: flex;
  margin-right: 25px;
  border-radius: 8px;
  min-width: 200px;
  min-height: 250px;
  background: linear-gradient(to bottom, #2c3e50, #bdc3c7);
  position: relative;
  transition: all 0.2s ease-in-out;
  overflow: visible;
  filter: blur(0px);
`

const TripItemContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  padding: 20px 10px 0 10px;
  transition: all 0.2s ease-in-out;
  > a {
    text-align: center;
    white-space: normal;
    color: white;
    margin: 20px 0 0 0;
    font-size: 16px;
    font-weight: 550;
    line-height: 20px;
    text-decoration: none;
  }
  > p,
  h6 {
    display: none;
  }
  &:hover {
    justify-content: space-between;
    padding: 0 10px 0 10px;
    > p {
      display: block;
      font-size: 13px;
      color: rgb(46, 43, 43);
      margin: 0px 0px 20px 0px;
      font-weight: normal;
      line-height: 15px;
      white-space: normal;
      text-align: center;
    }
    > h6 {
      display: -webkit-box;
      margin: 0;
      font-size: 14px;
      color: whitesmoke;
      text-align: center;
      font-weight: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`

// <div className={styles.trip_item}>
// 	<div className={styles.trip_image}>
// 		<img src={china} alt="trip icon" />
// 	</div>
// 	<div className={styles.trip_content}>
// 		<a href={`trips/${trip._id}`} id={styles.name}>
// 			{trip.name}
// 		</a>
// 		<h6 id={styles.date}>
// 			{new Date(trip.startdate.toString()).toLocaleDateString(
// 				"en-US",
// 				{
// 					// weekday: "short",
// 					year: "2-digit",
// 					month: "short",
// 					day: "numeric",
// 				}
// 			) +
// 				" - " +
// 				new Date(trip.enddate.toString()).toLocaleDateString(
// 					"en-US",
// 					{
// 						// weekday: "short",
// 						year: "2-digit",
// 						month: "short",
// 						day: "numeric",
// 					}
// 				)}
// 		</h6>
// 		<p id={styles.description}>{trip.description}</p>
// 	</div>
// </div>
