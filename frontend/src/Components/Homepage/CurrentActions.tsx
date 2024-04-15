import { useEffect, useState } from "react";
import styles from "./CurrentActions.module.css";
import { Broadcast } from "types/broadcast";
import { Trip } from "types/trip";
import { getUser, getUserEvents, getUserTrips } from "util/api";
import { useRouteLoaderData } from "react-router-dom";

const CurrentActions: React.FC = () => {
	const [activeState, setActiveState] = useState("events");
	const [events, setEvents] = useState<{ objects: Broadcast }>();
	const [trips, setTrips] = useState<{ objects: Trip }>();
	const logIn = useRouteLoaderData("root") as boolean;

	useEffect(() => {
		async function runThis() {
			const response = await getUser();
			if (response.ok) {
				setEvents(await getUserEvents(response.getJson.user.email));
				setTrips(await getUserTrips(response.getJson.user.email));
			}
		}
		logIn && runThis();
	}, [logIn]);

	return (
		<div className={styles.ca_body}>
			<div className={styles.ca_header}>
				<span
					onClick={() => setActiveState("events")}
					className={activeState === "events" ? styles.active : ""}
				>
					Current Events
				</span>
				<span
					onClick={() => setActiveState("trips")}
					className={activeState === "trips" ? styles.active : ""}
				>
					My Trips
				</span>
			</div>
			{logIn && activeState === "events" && (
				<div className={styles.ca_content}>{events?.objects[2].name}</div>
			)}
			{logIn && activeState === "trips" && (
				<div className={styles.ca_content}>{trips?.objects[2].name}</div>
			)}
			{!logIn && <div>Couldn't load information</div>}
		</div>
	);
};

export default CurrentActions;
