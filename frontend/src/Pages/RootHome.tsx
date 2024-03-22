import React from "react";
import { Outlet } from "react-router-dom";

// import MainNavigation from '../Components/Homepage/MainNavigation';
import MainNavBar from "Components/Homepage/MainNavBar";

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
