import { ActionFunction, LoaderFunction, json, redirect, useRouteLoaderData } from "react-router-dom";

import ElementItem from "../Components/ElementItem";

const ElementDetailPage: React.FC = () => {
    const elementData: any = useRouteLoaderData('element-detail');
    return (
        <ElementItem element={elementData} />
    );
};

export default ElementDetailPage;

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params.id;
    const response = await fetch('http://localhost:8080/elements/' + id);
    if (!response.ok) {
        throw json({ message: 'Could not fetch element details!' }, { status: 500 });
    } else {
        const resObj = await response.json();
        return resObj.element;
    }
};

export const action: ActionFunction = async ({ request, params }) => {
    const id = params.id;
    const response = await fetch('http://localhost:8080/elements/' + id, {
        method: request.method
    });
    if (!response.ok) {
        throw json({ message: "Couldn't delete elemenet" }, { status: 500 });
    }
    return redirect('/elements');
};
