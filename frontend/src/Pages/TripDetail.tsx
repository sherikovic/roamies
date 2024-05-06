import EventForm from "Components/Events/EventForm";
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

	return (
		<FlexboxCol>
			{tripData.description}
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
		</FlexboxCol>
	);
};

export default TripDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const id: any = params.id;
	const res = await getTrip(id);
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: 500 });
	}
};

export const action: ActionFunction = async ({ params }) => {
	const id: any = params.id;
	const res = await deleteTrip(id);

	if (res.error) {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
	return redirect("/trips");
};
