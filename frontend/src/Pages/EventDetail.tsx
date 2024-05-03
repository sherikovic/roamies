import {
	ActionFunction,
	LoaderFunction,
	json,
	redirect,
	useRouteLoaderData,
} from "react-router-dom";
import { Broadcast } from "types/broadcast";

import { deleteEvent, getEvent } from "util/api";

const EventDetailPage: React.FC = () => {
	const eventData = useRouteLoaderData("event-detail") as Broadcast;
	return <div>{eventData.description}</div>;
};

export default EventDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const id: any = params.id;
	const res = await getEvent(id);
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: 500 });
	}
};

export const action: ActionFunction = async ({ params }) => {
	const id: any = params.id;
	const res = await deleteEvent(id);

	if (res.error) {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
	return redirect("/trips");
};
