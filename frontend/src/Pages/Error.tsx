import { useRouteError } from 'react-router-dom'
import LandingNavigation from 'Components/Landingpage/LandingNavigation'
import ErrorContent from 'Components/Misc/ErrorContent'

const ErrorPage: React.FC = () => {
  const error: any = useRouteError()

  const title = error.data.title ?? 'An error occured!'
  const message = error.data.message ?? 'Something went wrong!'
  // if (error.status === 500) {
  // 	message = error.data.message;
  // }

  // if (error.status === 404) {
  // 	title = "Not found!";
  // 	message = "Could not find resource or page.";
  // }

  return (
    <div>
      <LandingNavigation />
      <ErrorContent title={title}>{message}</ErrorContent>
    </div>
  )
}

export default ErrorPage
