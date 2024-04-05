import React from "react";
import { LoaderFunction, Outlet, defer, json } from "react-router-dom";

// import MainNavigation from '../Components/Homepage/MainNavigation';
import MainNavBar from "Components/Homepage/MainNavBar";
import { getAllEvents, getAllTrips } from "util/api";

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
	const res = await getAllEvents();
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
};

const loadTrips = async () => {
	const res = await getAllTrips();
	if (!res.error) {
		return res.objects;
	} else {
		throw json({ message: res.error.message }, { status: res.error.status });
	}
};

// could actually defer them when we use lazy loading
export const loader: LoaderFunction = async ({ params }) => {
	return defer({
		events: await loadEvents(),
		trips: await loadTrips(),
	});
};
