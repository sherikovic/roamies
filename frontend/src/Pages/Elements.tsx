import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import ElementsList from "../Components/ElementsList";
import PageHeader from "../Components/PageHeader";

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
        throw json({ message: "Couldn't fetch information about elements!" }, { status: 500 })
    } else {
        const resObj = await response.json();
        return resObj.elements;
    }
};
