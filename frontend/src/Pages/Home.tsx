import { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router";

import styles from "./Home.module.css";
import EventsList from "Components/Homepage/EventsList";
import TripsList from "Components/Homepage/TripsList";
import rightArrowIcon from "../images/rightarrow.png";

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const logIn = useRouteLoaderData("root");
	const { events, trips }: any = useRouteLoaderData("root-home");

	useEffect(() => {
		!logIn && navigate("/");
	}, [logIn, navigate]);

	return (
		<div className={styles.home_page}>
			<div className={styles.home_body}>
				{/* <div className={styles.side_nav}></div> */}
				<div className={styles.home_contents}>
					<section className={styles.events_layout}>
						<div className={styles.events_header}>
							<p>Events</p>
							<a href="/events">
								Explore
								<img
									src={rightArrowIcon}
									alt="right arrow"
									className={styles.icon}
								/>
							</a>
						</div>
						<EventsList data={events} />
					</section>
					<section className={styles.trips_layout}>
						<div className={styles.trips_header}>
							<p>Trips</p>
							<a href="/trips">
								Explore
								<img
									src={rightArrowIcon}
									alt="right arrow"
									className={styles.icon}
								/>
							</a>
						</div>
						<TripsList data={trips} />
					</section>
				</div>
				<div className={styles.right_actions}></div>
			</div>
		</div>
	);
};

export default HomePage;
