import React from 'react';
import ElementModel from '../models/element';
import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './ElementItem.module.css';

interface ElementItemProps {
    element: ElementModel;
    children?: React.ReactNode;
};

const ElementItem: React.FC<ElementItemProps> = (props) => {
    const submit = useSubmit();
    const data: any = useRouteLoaderData('root');

    const deleteElement = () => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            // this will trigger an action on the original element that ElementItem was instantiated in
            // which is ElementDetail, as long as there is no action here
            submit(null, { method: 'DELETE' });
        }
    };

    return (
        <article className={classes.element}>
            <p>Name: <span>{props.element.name}</span></p>
            <p>Description: <span>{props.element.description}</span></p>
            <p>Value: <span>{props.element.value}</span></p>
            <menu className={classes.actions}>
                <Link to="..">Back</Link>
                {data && data.user &&
                    <div>
                        <Link to="edit">Edit</Link>
                        <button onClick={deleteElement}>Delete</button>
                    </div>
                }
            </menu>
        </article>
    );
};

export default ElementItem;
