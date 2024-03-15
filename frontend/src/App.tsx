import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Main Routes
import LandingPage from './Pages/Landing';
import RootMain, { loader as getLoggedInUserLoader } from './Pages/RootMain';

// Auth and Settings Routes
import LoginPage, { action as authFormAction } from './Pages/Login';
import { action as logoutAction } from './Pages/Logout';
import ErrorPage from './Pages/Error';
import ProfilePage from './Pages/Profile';
import SettingsPage, {
	action as settingsFormAction,
	loader as settingsFormLoader,
} from './Pages/Settings';

// Trips Routes
import TripDetailPage, {
	loader as tripDetailLoader,
	action as deleteTripAction,
} from './Pages/TripDetail';
import TripsPage, { loader as tripsLoader } from './Pages/Trips';

// Locations Routes
import LocationsPage, { loader as locationsLoader } from './Pages/Locations';
import LocationDetailPage, {
	loader as locationDetailLoader,
	action as deleteLocationAction,
} from './Pages/LocationDetail';

import AboutPage from './Pages/About';
import HowToUsePage from 'Pages/HowToUse';
import FAQPage from 'Pages/FAQ';
import ContactPage from 'Pages/Contact';
import RootLanding from 'Pages/RootLanding';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/',
		element: <RootLanding />,
		children: [
			{
				path: 'about',
				element: <AboutPage />,
			},
			{
				path: 'how-to-use',
				element: <HowToUsePage />,
			},
			{
				path: 'faq',
				element: <FAQPage />,
			},
			{
				path: 'contact',
				element: <ContactPage />,
			},
		],
	},
	{
		element: <RootMain />,
		errorElement: <ErrorPage />,
		id: 'root',
		loader: getLoggedInUserLoader,
		children: [
			{
				path: 'trips',
				children: [
					{
						index: true,
						element: <TripsPage />,
						loader: tripsLoader,
					},
					{
						path: ':id',
						id: 'trip-detail',
						element: <TripDetailPage />,
						loader: tripDetailLoader,
						action: deleteTripAction,
					},
				],
			},
			{
				path: 'locations',
				children: [
					{
						index: true,
						element: <LocationsPage />,
						loader: locationsLoader,
					},
					{
						path: ':id',
						id: 'location-detail',
						element: <LocationDetailPage />,
						loader: locationDetailLoader,
						action: deleteLocationAction,
					},
				],
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
			{
				path: 'auth',
				element: <LoginPage />,
				action: authFormAction,
			},
			{
				path: 'logout',
				action: logoutAction,
			},
			{
				path: 'settings',
				element: <SettingsPage />,
				loader: settingsFormLoader,
				action: settingsFormAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
