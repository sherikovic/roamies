import EventForm from "Components/Events/EventForm";
import TripForm from "Components/Trip/TripForm";
import { useState } from "react";
import {
	ActionFunction,
	LoaderFunction,
	json,
	redirect,
	useRouteLoaderData,
} from "react-router-dom";
import { Trip } from "types/trip";

import { deleteTrip, getTrip } from "util/api";
import {
	CardOverlay,
	FlexboxCol,
	FlexboxRow,
	OverlayContent,
} from "util/common_styles";

const TripDetailPage: React.FC = () => {
	const tripData = useRouteLoaderData("trip-detail") as Trip;
	const [showEventForm, setShowEventForm] = useState(false);
	const [showTripForm, setShowTripForm] = useState(false);

	return (
		<FlexboxCol>
			<h1>{tripData.title}</h1>
			<FlexboxRow style={{ justifyContent: "space-between" }}>
				{tripData.description}
				<button onClick={() => setShowTripForm(true)}>Edit</button>
			</FlexboxRow>
			<FlexboxRow style={{ justifyContent: "space-between" }}>
				<h1>Events</h1>
				<button onClick={() => setShowEventForm(true)}>Start an event</button>
			</FlexboxRow>
			<FlexboxCol>
				{tripData.events!.length > 0 ? (
					tripData.events?.map((event) => (
						<a href={`/events/${event._id}`} key={event._id}>
							{event.title}
						</a>
					))
				) : (
					<h6>No events</h6>
				)}
			</FlexboxCol>
			{showEventForm && (
				<CardOverlay>
					<OverlayContent>
						<EventForm cancelHandler={() => setShowEventForm(false)} />
					</OverlayContent>
				</CardOverlay>
			)}
			{showTripForm && (
				<CardOverlay>
					<OverlayContent>
						<TripForm
							tripData={tripData}
							cancelHandler={() => setShowTripForm(false)}
						/>
					</OverlayContent>
				</CardOverlay>
			)}
		</FlexboxCol>
	);
};

export default TripDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const id: any = params.id;
	const response = await getTrip(id);
	if (response.ok) {
		return response.getJson.objects;
	} else {
		throw json(
			{ title: response.getJson.message, message: response.getJson.error },
			{ status: 500 }
		);
	}
};
