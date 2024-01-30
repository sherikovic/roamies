import { Form, useActionData } from 'react-router-dom';

import ElementModel from '../models/element';
import classes from './ElementForm.module.css';

interface ElementFormProps {
    method: any;
    data?: ElementModel;
    cancelHandler: () => void;
    submitHandler: () => void;
    children?: React.ReactNode;
};

const ElementForm: React.FC<ElementFormProps> = (props) => {
    const data: any = useActionData();

    return (
        <div className={classes.card_container}>
            <span className={classes.card_close} onClick={props.cancelHandler}>X</span>
            <p className={classes.paragraph}>Define your element</p>
            <Form method={props.method} className={classes.form}>
                {data && data.name &&
                    <p style={{ color: 'orange' }}>{data.name}</p>
                }
                <p>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={props.data ? props.data.name : ''}
                    />
                </p>
                {data && data.value &&
                    <p style={{ color: 'orange' }}>{data.value}</p>
                }
                <p>
                    <label htmlFor="value">Value:</label>
                    <input
                        type="text"
                        name="value"
                        id="value"
                        defaultValue={props.data ? props.data.value : ''}
                    />
                </p>
                {data && data.description &&
                    <p style={{ color: 'orange' }}>{data.description}</p>
                }
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
                    <button type="button" onClick={props.cancelHandler}>Cancel</button>
                    <button onSubmit={props.submitHandler}>Submit</button>
                </div>
            </Form>
        </div>
    );
};

export default ElementForm;

