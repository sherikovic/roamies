import React from "react";
import { Outlet } from "react-router-dom";

import LandingNavigation from "Components/Landingpage/LandingNavigation";

const RootLanding: React.FC = () => {
	return (
		<React.Fragment>
			<LandingNavigation />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
};

export default RootLanding;
