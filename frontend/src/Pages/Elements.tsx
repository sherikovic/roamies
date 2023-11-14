import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import ElementsList from "../Components/ElementsList";

const ElementsPage: React.FC = () => {
    const elementsArray: any = useLoaderData();
    return (
        <ElementsList elements={elementsArray} />
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
