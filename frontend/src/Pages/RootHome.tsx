import React from "react";
import { LoaderFunction, Outlet, defer, json } from "react-router-dom";

import MainNavBar from "Components/Homepage/HomeNavigation";
import { getAllDBEntries } from "util/api";
import { Broadcast } from "types/broadcast";
import { Trip } from "types/trip";

const RootHome: React.FC = () => {
	return (
		<React.Fragment>
			<MainNavBar />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
};

export default RootHome;

const loadEvents = async () => {
	const response = await getAllDBEntries<Broadcast>("events");
	if (response.ok) {
		return response.getJson.objects;
	} else {
		throw json(
			{ message: response.getJson.error },
			{ status: response.status }
		);
	}
};

const loadTrips = async () => {
	const response = await getAllDBEntries<Trip>("trips");
	if (response.ok) {
		return response.getJson.objects;
	} else {
		throw json(
			{ message: response.getJson.error },
			{ status: response.status }
		);
	}
};

// could actually defer them when we use lazy loading
export const loader: LoaderFunction = async ({ params }) => {
	return defer({
		events: await loadEvents(),
		trips: await loadTrips(),
	});
};
