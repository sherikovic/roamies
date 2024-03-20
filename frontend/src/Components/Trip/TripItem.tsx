import React, { useState } from 'react';
import { Trip } from '../../types/trip';
import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './TripItem.module.css';
import TripForm from './TripForm';

interface ElementItemProps {
	tripData: Trip;
	children?: React.ReactNode;
}

const ElementItem: React.FC<ElementItemProps> = (props) => {
	const submit = useSubmit();
	const data: any = useRouteLoaderData('root');
	const [editTrip, setEditTrip] = useState(false);

	const deleteElement = () => {
		const proceed = window.confirm('Are you sure?');
		if (proceed) {
			// this will trigger an action on the original element that ElementItem was instantiated in
			// which is ElementDetail, as long as there is no action here
			submit(null, { method: 'DELETE' });
		}
	};

	return (
		<div>
			<div className={classes.element}>
				<p>
					Name: <span>{props.tripData.name}</span>
				</p>
				<p>
					Description: <span>{props.tripData.description}</span>
				</p>
				<p>
					Location: <span>{props.tripData.location}</span>
				</p>
				<menu className={classes.actions}>
					<Link to='..'>Back</Link>
					{data && data.user && (
						<div>
							<span onClick={() => setEditTrip(!editTrip)}>Edit</span>
							<button onClick={deleteElement}>Delete</button>
						</div>
					)}
				</menu>
			</div>
			{editTrip && (
				<div className={classes.card_overlay}>
					<div className={classes.overlay_content}>
						<TripForm
							method='PATCH'
							tripData={props.tripData}
							cancelHandler={() => setEditTrip(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ElementItem;
