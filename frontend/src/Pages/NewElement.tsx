import { ActionFunction, json, redirect, useRouteLoaderData } from 'react-router-dom';
import ElementForm from '../Components/ElementForm';

const NewElementPage: React.FC = () => {
    const data: any = useRouteLoaderData('root');

    return (
        <div>
            {data && data.user ? <ElementForm method='post' /> :
                <div>
                    <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
                </div>
            }
        </div>
    );
};

export default NewElementPage;

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