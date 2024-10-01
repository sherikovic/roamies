import { useRouteError } from "react-router-dom";
import ErrorContent from "../Components/Misc/ErrorContent";
import LandingNavigation from "Components/Landingpage/LandingNavigation";

const ErrorPage: React.FC = () => {
	const error: any = useRouteError();

	let title = error.data.title ?? "An error occured!";
	let message = error.data.message ?? "Something went wrong!";
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
	);
};

export default ErrorPage;
