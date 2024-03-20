import React from 'react';
import { Outlet } from 'react-router-dom';

// import MainNavigation from '../Components/Homepage/MainNavigation';
import TopNavBar from 'Components/Homepage/MainNavBar';

const RootHome: React.FC = () => {
	return (
		<React.Fragment>
			<TopNavBar />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
};

export default RootHome;
