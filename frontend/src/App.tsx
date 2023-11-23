import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NewElementPage from './Pages/NewElement';
import ElementDetailPage, {
  loader as elementDetailLoader,
  action as deleteElementAction
} from './Pages/ElementDetail';
import RootLayout, { loader as getLoggedInUserLoader } from './Pages/Root';
import HomePage from './Pages/Home';
import ElementsPage, { loader as elementsLoader } from './Pages/Elements';
import EditElementsPage from './Pages/EditElement';
import LoginPage, { action as authFormAction } from './Pages/Login';
import { action as manipulateFormAction } from './Components/ElementForm';
import { action as logoutAction } from './Pages/Logout';
import ErrorPage from './Pages/Error';

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
        path: 'auth',
        element: <LoginPage />,
        action: authFormAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;