import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Main Routes
import LandingPage from './Pages/Landing'
import RootHome, { loader as rootHomeLoader } from './Pages/RootHome'
import SignupPage from 'Pages/Signup'

// Auth and Settings Routes
import ErrorPage from './Pages/Error'
import SettingsPage, { action as settingsFormAction } from './Pages/Settings'

// Trips Routes
import TripDetailPage, { loader as tripDetailLoader } from './Pages/TripDetail'
import TripsPage, { loader as tripsLoader } from './Pages/Trips'

// Locations Routes
import LocationsPage, { loader as locationsLoader } from './Pages/Locations'
import LocationDetailPage, {
  loader as locationDetailLoader,
  action as deleteLocationAction,
} from './Pages/LocationDetail'

import AboutPage from './Pages/About'
import HowToUsePage from 'Pages/HowToUse'
import FAQPage from 'Pages/FAQ'
import ContactPage from 'Pages/Contact'
import RootLanding from 'Pages/RootLanding'

// Util functions
import { isUserLoggedIn } from 'util/util'
import HomePage from 'Pages/Home'
import EventsPage, { loader as eventsLoader } from 'Pages/Events'
import EventDetailPage, { loader as eventDetailLoader } from 'Pages/EventDetail'
import AuthProvider from 'util/AuthProvider'
import ProfilePage from 'Components/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    errorElement: <ErrorPage />,
    loader: isUserLoggedIn,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        id: 'root-landing',
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
        element: <RootHome />,
        id: 'root-home',
        loader: rootHomeLoader,
        children: [
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'trips',
            element: <TripsPage />,
            id: 'trips',
            loader: tripsLoader,
          },
          {
            path: 'trips/:id',
            id: 'trip-detail',
            element: <TripDetailPage />,
            loader: tripDetailLoader,
          },
          {
            path: 'events',
            element: <EventsPage />,
            id: 'events',
            loader: eventsLoader,
          },
          {
            path: 'events/:id',
            id: 'event-detail',
            element: <EventDetailPage />,
            loader: eventDetailLoader,
          },
          {
            path: 'locations',
            element: <LocationsPage />,
            loader: locationsLoader,
          },
          {
            path: 'locations/:id',
            id: 'location-detail',
            element: <LocationDetailPage />,
            loader: locationDetailLoader,
            action: deleteLocationAction,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
            action: settingsFormAction,
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
