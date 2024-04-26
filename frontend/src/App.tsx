import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Main Routes
import LandingPage from "./Pages/Landing";
import RootHome, { loader as rootHomeLoader } from "./Pages/RootHome";
import SignupPage from "Pages/Signup";

// Auth and Settings Routes
import { action as logoutAction } from "./Pages/Logout";
import ErrorPage from "./Pages/Error";
import ProfilePage from "./Pages/Profile";
import SettingsPage, {
	action as settingsFormAction,
	loader as settingsFormLoader,
} from "./Pages/Settings";

// Trips Routes
import TripDetailPage, {
	loader as tripDetailLoader,
	action as deleteTripAction,
} from "./Pages/TripDetail";
import TripsPage, { loader as tripsLoader } from "./Pages/Trips";

// Locations Routes
import LocationsPage, { loader as locationsLoader } from "./Pages/Locations";
import LocationDetailPage, {
	loader as locationDetailLoader,
	action as deleteLocationAction,
} from "./Pages/LocationDetail";

import AboutPage from "./Pages/About";
import HowToUsePage from "Pages/HowToUse";
import FAQPage from "Pages/FAQ";
import ContactPage from "Pages/Contact";
import RootLanding from "Pages/RootLanding";

// Util functions
import { isUserLoggedIn } from "util/util";
import HomePage from "Pages/Home";
import EventsPage from "Pages/Events";

const router = createBrowserRouter([
	{
		path: "/",
		id: "root",
		errorElement: <ErrorPage />,
		loader: isUserLoggedIn,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: "signup",
				element: <SignupPage />,
			},
			{
				path: "logout",
				action: logoutAction,
			},
			{
				element: <RootLanding />,
				id: "root-landing",
				errorElement: <ErrorPage />,
				children: [
					{
						path: "about",
						element: <AboutPage />,
					},
					{
						path: "how-to-use",
						element: <HowToUsePage />,
					},
					{
						path: "faq",
						element: <FAQPage />,
					},
					{
						path: "contact",
						element: <ContactPage />,
					},
				],
			},
			{
				element: <RootHome />,
				id: "root-home",
				loader: rootHomeLoader,
				errorElement: <ErrorPage />,
				children: [
					{
						path: "home",
						element: <HomePage />,
					},
					{
						path: "trips",
						element: <TripsPage />,
						id: "trips",
						loader: tripsLoader,
						children: [
							{
								path: ":id",
								id: "trip-detail",
								element: <TripDetailPage />,
								loader: tripDetailLoader,
								action: deleteTripAction,
							},
						],
					},
					{
						path: "events",
						element: <EventsPage />,
						children: [
							{
								path: ":id",
								id: "event-detail",
								element: <TripDetailPage />,
								loader: tripDetailLoader,
								action: deleteTripAction,
							},
						],
					},
					{
						path: "locations",
						element: <LocationsPage />,
						loader: locationsLoader,
						children: [
							{
								path: ":id",
								id: "location-detail",
								element: <LocationDetailPage />,
								loader: locationDetailLoader,
								action: deleteLocationAction,
							},
						],
					},
					{
						path: "profile",
						element: <ProfilePage />,
					},
					{
						path: "settings",
						element: <SettingsPage />,
						loader: settingsFormLoader,
						action: settingsFormAction,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
