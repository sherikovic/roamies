import { Link, useRouteLoaderData } from 'react-router-dom';
import { Trip } from '../../types/trip';
import classes from './TripsList.module.css';
import { useState } from 'react';
import TripForm from './TripForm';

interface TripsListProps {
	trips: Trip[];
	children?: React.ReactNode;
}

const TripsList: React.FC<TripsListProps> = (props) => {
	const data: any = useRouteLoaderData('root');
	const [createNewTrip, setCreateNewTrip] = useState(false);

	return (
		<div>
			<div>
				<div className={classes.trips}>
					<ul className={classes.list}>
						{props.trips.map((trip: Trip) => (
							<li key={trip._id} className={classes.item}>
								<Link to={trip._id} className={classes.content}>
									<h4>{trip.name}</h4>
								</Link>
							</li>
						))}
					</ul>
				</div>
				{data && data.user && (
					<div className={classes.new}>
						<span onClick={() => setCreateNewTrip(!createNewTrip)}>
							+ New Trip
						</span>
					</div>
				)}
			</div>
			{createNewTrip && (
				<div className={classes.card_overlay}>
					<div className={classes.overlay_content}>
						<TripForm
							method='POST'
							cancelHandler={() => setCreateNewTrip(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default TripsList;
