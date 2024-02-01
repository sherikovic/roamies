import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Main Routes
import HomePage from './Pages/Home';
import RootLayout, { loader as getLoggedInUserLoader } from './Pages/Root';

// Auth and Settings Routes
import LoginPage, { action as authFormAction } from './Pages/Login';
import { action as logoutAction } from './Pages/Logout';
import ErrorPage from './Pages/Error';
import ProfilePage from './Pages/Profile';
import SettingsPage, {
  action as settingsFormAction,
  loader as settingsFormLoader
} from './Pages/Settings';

// Elements Routes
import ElementDetailPage, {
  loader as elementDetailLoader,
  action as deleteElementAction
} from './Pages/ElementDetail';
import ElementsPage, { loader as elementsLoader, } from './Pages/Elements';

// Locations Routes
import LocationsPage, { loader as locationsLoader } from './Pages/Locations';
import LocationDetailPage, {
  loader as locationDetailLoader,
  action as deleteLocationAction
} from './Pages/LocationDetail';
import EditLocationPage from './Pages/EditLocation';
import NewLocationPage, { action as manipulateLocationFormAction } from './Pages/NewLocation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: getLoggedInUserLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'elements',
        children: [
          {
            index: true,
            element: <ElementsPage />,
            loader: elementsLoader
          },
          {
            path: ':id',
            id: 'element-detail',
            element: <ElementDetailPage />,
            loader: elementDetailLoader,
            action: deleteElementAction
          }
        ]
      },
      {
        path: 'locations',
        children: [
          {
            index: true,
            element: <LocationsPage />,
            loader: locationsLoader
          },
          {
            path: ':id',
            id: 'location-detail',
            loader: locationDetailLoader,
            children: [
              {
                index: true,
                element: <LocationDetailPage />,
                action: deleteLocationAction
              },
              {
                path: 'edit',
                element: <EditLocationPage />,
                action: manipulateLocationFormAction
              }
            ]
          },
          {
            path: 'new',
            element: <NewLocationPage />,
            action: manipulateLocationFormAction
          }
        ]
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'auth',
        element: <LoginPage />,
        action: authFormAction
      },
      {
        path: 'logout',
        action: logoutAction
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        loader: settingsFormLoader,
        action: settingsFormAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
