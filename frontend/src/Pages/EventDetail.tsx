import EventForm from "Components/Events/EventForm";
import { useState } from "react";
import { LoaderFunction, json, useRouteLoaderData } from "react-router-dom";
import { Broadcast } from "types/broadcast";

import { getEvent } from "util/api";
import {
	CardOverlay,
	FlexboxCol,
	FlexboxRow,
	OverlayContent,
} from "util/common_styles";

const EventDetailPage: React.FC = () => {
	const eventData = useRouteLoaderData("event-detail") as Broadcast;
	const [showEditEventForm, setShowEditEventForm] = useState(false);

	return (
		<FlexboxCol>
			<h1>{eventData.title}</h1>
			<FlexboxRow style={{ justifyContent: "space-between" }}>
				{eventData.description}
				<button onClick={() => setShowEditEventForm(true)}>Edit</button>
			</FlexboxRow>
			<h3>Related trip</h3>
			{eventData?.trip ? (
				<a href={`/trips/${eventData.trip._id}`}>{eventData.trip.title}</a>
			) : (
				<h6>No related trips</h6>
			)}
			{showEditEventForm && (
				<CardOverlay>
					<OverlayContent>
						<EventForm
							eventData={eventData}
							cancelHandler={() => setShowEditEventForm(false)}
						/>
					</OverlayContent>
				</CardOverlay>
			)}
		</FlexboxCol>
	);
};

export default EventDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const id: any = params.id;
	const response = await getEvent(id);
	if (response.ok) {
		return response.getJson.objects;
	} else {
		throw json(
			{ title: response.getJson.message, message: response.getJson.error },
			{ status: 500 }
		);
	}
};
