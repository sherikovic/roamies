import { ActionFunction, LoaderFunction } from "react-router-dom";

const LocationDetailPage: React.FC = () => {
	return (
		<>
			<p>Location Detail page</p>
		</>
	);
};

export default LocationDetailPage;

export const loader: LoaderFunction = async ({ request, params }) => {
	return null;
};

export const action: ActionFunction = async ({ request, params }) => {
	return null;
};
