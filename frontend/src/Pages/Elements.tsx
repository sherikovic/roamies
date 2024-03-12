import { LoaderFunction, json, useLoaderData } from 'react-router-dom';
import ElementsList from '../Components/ElementsList';
import PageHeader from '../Components/PageHeader';
import { Element } from '../types/element';
import { apiGet, createTrip, getTrip } from 'util/api';
import { Trip } from 'types/trip';

const ElementsPage: React.FC = () => {
	const elementsArray: any = useLoaderData();
	return (
		<div>
			<PageHeader headerText='Elements'>
				Save your keys, elements, codes,..etc
			</PageHeader>
			<ElementsList elements={elementsArray} />
		</div>
	);
};

export default ElementsPage;

export const loader: LoaderFunction = async () => {
	// const data: Trip = {
	// 	name: 'China',
	// 	location: 'China Mainland',
	// 	id: '11',
	// 	description: 'trip',
	// };
	// const res1 = createTrip({ data: data });
	const res1: any = await getTrip('65efae603c9d51d37e5fefa9', null);
	// const res1: any = await getTrip(null, 'tim');
	console.log(res1);
	const res = await apiGet<Element>(`elements`);
	const resJson = res.getJson;
	if (res.ok) {
		return resJson.objects;
	} else {
		throw json(
			{ message: resJson.error?.message },
			{ status: resJson.error?.status }
		);
	}
};
