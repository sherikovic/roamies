import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import { Broadcast } from "types/broadcast";
import { getAllEvents } from "util/api";

const EventsPage: React.FC = () => {
	const eventsArray = useLoaderData() as Broadcast[];
	console.log(eventsArray);
	return (
		<div>
			{eventsArray.map((event) => (
				<div key={event._id}>
					<a href={`events/${event._id}`}>{event.title}</a>
				</div>
			))}
		</div>
	);
};

export default EventsPage;

export const loader: LoaderFunction = async () => {
	const res = await getAllEvents();
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
};
