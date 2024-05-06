import EventForm from "Components/Events/EventForm";
import NewTrip from "Components/Trip/NewTrip";
import { useState } from "react";
import { CardOverlay, OverlayContent } from "util/common_styles";

const HomeActions: React.FC = () => {
	const [showTripForm, setShowTripForm] = useState(false);
	const [showEventForm, setShowEventForm] = useState(false);

	return (
		<div>
			<button
				onClick={() => {
					setShowTripForm(true);
					setShowEventForm(false);
				}}
			>
				Start a new trip
			</button>
			<button
				onClick={() => {
					setShowEventForm(true);
					setShowTripForm(false);
				}}
			>
				Share an event
			</button>
			{showTripForm && (
				<CardOverlay>
					<OverlayContent>
						<NewTrip cancelHandler={() => setShowTripForm(false)} />
					</OverlayContent>
				</CardOverlay>
			)}
			{showEventForm && (
				<CardOverlay>
					<OverlayContent>
						<EventForm cancelHandler={() => setShowEventForm(false)} />
					</OverlayContent>
				</CardOverlay>
			)}
		</div>
	);
};

export default HomeActions;
