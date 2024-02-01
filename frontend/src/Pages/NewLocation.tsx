import { ActionFunction, json, redirect, useRouteLoaderData } from "react-router-dom";
import LocationForm from "../Components/LocationForm";

const NewLocationPage: React.FC = () => {
    const data: any = useRouteLoaderData('root');

    return (
        <>
            {data && data.user ? <LocationForm method='post' /> :
                <div>
                    <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
                </div>
            }
        </>
    );
};

export default NewLocationPage;

export const action: ActionFunction = async ({ request, params }) => {
    const method = request.method;
    const data = await request.formData();

    const FormData = {
        name: data.get('name')
    };

    if (FormData.name === "") {
        return { name: "Name field is required!" }
    };

    let url = 'http://localhost:8080/locations';
    if (method === 'PATCH') {
        const id = params.id;
        url = 'http://localhost:8080/locations/' + id;
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
        return redirect('/locations/' + resObj.location._id);
    } else {
        return redirect('/locations/' + params.id);
    }
}