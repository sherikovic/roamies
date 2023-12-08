import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NewElementPage, { action as manipulateFormAction } from './Pages/NewElement';
import ElementDetailPage, {
  loader as elementDetailLoader,
  action as deleteElementAction
} from './Pages/ElementDetail';
import RootLayout, { loader as getLoggedInUserLoader } from './Pages/Root';
import HomePage from './Pages/Home';
import ElementsPage, { loader as elementsLoader } from './Pages/Elements';
import EditElementsPage from './Pages/EditElement';
import LoginPage, { action as authFormAction } from './Pages/Login';
import { action as logoutAction } from './Pages/Logout';
import ErrorPage from './Pages/Error';
import ProfilePage from './Pages/Profile';
import SettingsPage from './Pages/Settings';

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
            loader: elementDetailLoader,
            children: [
              {
                index: true,
                element: <ElementDetailPage />,
                action: deleteElementAction
              },
              {
                path: 'edit',
                element: <EditElementsPage />,
                action: manipulateFormAction
              }
            ]
          },
          {
            path: 'new',
            element: <NewElementPage />,
            action: manipulateFormAction
          },
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
        element: <SettingsPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
