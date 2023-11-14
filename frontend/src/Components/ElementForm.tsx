import React from 'react';
import { ActionFunction, Form, json, redirect, useNavigate } from 'react-router-dom';

import ElementModel from '../models/element';
import classes from './ElementForm.module.css';

interface ElementFormProps {
    method: any;
    data?: ElementModel;
    children?: React.ReactNode;
};

const ElementForm: React.FC<ElementFormProps> = (props) => {
    const navigate = useNavigate();
    const cancelHandler = () => {
        navigate('..');
    };

    return (
        <React.Fragment>
            <div>
                <p className={classes.paragraph}>Define your element</p>
            </div>
            <Form method={props.method} className={classes.form}>
                <p>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={props.data ? props.data.name : ''}
                    />
                </p>
                <p>
                    <label htmlFor="value">Value:</label>
                    <input
                        type="text"
                        name="value"
                        id="value"
                        defaultValue={props.data ? props.data.value : ''}
                    />
                </p>
                <p>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Describe the usage of this element"
                        cols={30}
                        rows={3}
                        defaultValue={props.data ? props.data.description : ''}
                    />
                </p>
                <div className={classes.actions}>
                    <button type="button" onClick={cancelHandler}>Cancel</button>
                    <button>Submit</button>
                </div>
            </Form>
        </React.Fragment>
    );
};

export default ElementForm;

export const action: ActionFunction = async ({ request, params }) => {
    const method = request.method;
    const data = await request.formData();

    const FormData = {
        name: data.get('name'),
        value: data.get('value'),
        description: data.get('description')
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

    const resData = await response.json();

    if (!response.ok) {
        throw json({ message: 'Something went wrong!' }, { status: 500 });
    };

    if (method === 'POST') {
        return redirect('/elements/' + resData.element._id);
    } else {
        return redirect('/elements/' + params.id);
    }
};
