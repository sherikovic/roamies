import {
    ActionFunction,
    LoaderFunction,
    json,
    redirect,
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

export const action: ActionFunction = async ({ request, params }) => {
    const method = request.method;
    const data = await request.formData();

    const FormData = {
        name: data.get('name'),
        value: data.get('value'),
        description: data.get('description')
    };

    if (FormData.name === "") {
        return { name: "Name field is required!" }
    };
    if (FormData.value === "") {
        return { value: "Value field is required!" }
    };
    if (FormData.description === "") {
        return { description: "Description field is required!" }
    };

    let url = 'http://localhost:8080/elements';
    if (method === 'PATCH') {
        const id = params.id;
        url = 'http://localhost:8080/elements/' + id;
    };

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
    });

    const resObj: any = await response.json();

    if (!response.ok) {
        // throw json({ message: 'Something went wrong!' }, { status: 500 });
        throw json({ message: resObj.message }, { status: resObj.status });
    };

    if (method === 'POST') {
        return redirect('/elements/' + resObj.element._id);
    } else {
        return redirect('/elements/' + params.id);
    }
};