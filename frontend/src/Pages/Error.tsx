import { useRouteError } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
import ErrorContent from "../Components/ErrorContent";

const ErrorPage: React.FC = () => {
    const error: any = useRouteError();

    let title = "An error occured!"
    let message = "Something went wrong!"

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not found!"
        message = "Could not find resource or page."
    }

    return (
        <>
            <MainNavigation />
            <ErrorContent title={title}>
                {message}
            </ErrorContent>
        </>
    );
}

export default ErrorPage;