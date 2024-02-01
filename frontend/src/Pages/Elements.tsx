import {
    LoaderFunction,
    json,
    useLoaderData
} from "react-router-dom";
import ElementsList from "../Components/ElementsList";
import PageHeader from "../Components/PageHeader";
import ElementModel from "../models/element";

const ElementsPage: React.FC = () => {
    const elementsArray: any = useLoaderData();
    return (
        <div>
            <PageHeader headerText="Elements">
                Save your keys, elements, codes,..etc
            </PageHeader>
            <ElementsList elements={elementsArray} />
        </div>
    );
};

export default ElementsPage;

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await fetch('http://localhost:8080/elements');
    if (!response.ok) {
        const resObj: {
            message: string,
            status: number
        } = await response.json();
        throw json(
            { message: resObj.message },
            { status: resObj.status }
        )
    } else {
        const resObj: {
            elements: ElementModel[]
        } = await response.json();
        return resObj.elements;
    }
};
