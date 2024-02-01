import React, { useState } from 'react';
import ElementModel from '../models/element';
import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './ElementItem.module.css';
import ElementForm from './ElementForm';

interface ElementItemProps {
    elementData: ElementModel;
    children?: React.ReactNode;
};

const ElementItem: React.FC<ElementItemProps> = (props) => {
    const submit = useSubmit();
    const data: any = useRouteLoaderData('root');
    const [editElement, setEditElement] = useState(false);

    const deleteElement = () => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            // this will trigger an action on the original element that ElementItem was instantiated in
            // which is ElementDetail, as long as there is no action here
            submit(null, { method: 'DELETE' });
        }
    };

    return (
        <div>
            <div className={classes.element}>
                <p>Name: <span>{props.elementData.name}</span></p>
                <p>Description: <span>{props.elementData.description}</span></p>
                <p>Value: <span>{props.elementData.value}</span></p>
                <menu className={classes.actions}>
                    <Link to="..">Back</Link>
                    {data && data.user &&
                        <div>
                            <span onClick={() => setEditElement(!editElement)}>Edit</span>
                            <button onClick={deleteElement}>Delete</button>
                        </div>
                    }
                </menu>
            </div>
            {editElement && (
                <div className={classes.card_overlay}>
                    <div className={classes.overlay_content}>
                        <ElementForm
                            method="PATCH"
                            elementData={props.elementData}
                            cancelHandler={() => setEditElement(false)}
                        />
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default ElementItem;
