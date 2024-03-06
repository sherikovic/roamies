import { LoaderFunction, json, useLoaderData } from 'react-router-dom';
import ElementsList from '../Components/ElementsList';
import PageHeader from '../Components/PageHeader';
import { Element } from '../types/element';
import { apiGet } from 'util/api';

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
