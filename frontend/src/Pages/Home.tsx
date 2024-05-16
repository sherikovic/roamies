import { useContext, useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router";

import EventsList from "Components/Homepage/EventsList";
import TripsList from "Components/Homepage/TripsList";
import CurrentActions from "Components/Homepage/CurrentActions";
import { Broadcast } from "types/broadcast";
import { Trip } from "types/trip";
import HomeActions from "Components/Homepage/HomeActions";
import styled from "styled-components/macro";
import { FlexboxCol, FlexboxRow } from "util/common_styles";
import { AuthContext } from "util/auth-context";

const HomePage: React.FC = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const { events, trips } = useRouteLoaderData("root-home") as {
		events: Broadcast[];
		trips: Trip[];
	};

	useEffect(() => {
		!authContext.isAuthenticated && navigate("/");
	}, [authContext.isAuthenticated, navigate]);

	return (
		<FlexboxCol>
			<FlexboxRow>
				<HomeActions />
			</FlexboxRow>
			<FlexboxRow style={{ alignItems: "flex-start" }}>
				{/* <FlexboxCol className={styles.side_nav}></FlexboxCol> */}
				<HomePageContentsItems>
					<TripsList trips={trips} />
					<EventsList events={events} />
				</HomePageContentsItems>
				<CurrentActionsLayout>
					<CurrentActions />
				</CurrentActionsLayout>
			</FlexboxRow>
		</FlexboxCol>
	);
};

export default HomePage;

const HomePageContentsItems = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 850px;
	margin-right: 25px;
`;

const CurrentActionsLayout = styled.div`
	display: flex;
	background-color: white;
	border: 1px solid #c2c2d1;
	border-radius: 8px;
`;
