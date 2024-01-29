import { Form, useActionData, useNavigate } from "react-router-dom";
import LocationModel from "../models/location";
import classes from './LocationForm.module.css';

interface LocationFormProps {
    method: any;
    data?: LocationModel;
    children?: React.ReactNode;
};

const LocationForm: React.FC<LocationFormProps> = (props) => {
    const data: any = useActionData();
    const navigate = useNavigate();
    const cancelHandler = () => {
        navigate('..');
    };

    return (
        <div>
            <div>
                <p className={classes.paragraph}>Pin your location</p>
            </div>
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
                <div className={classes.actions}>
                    <button type="button" onClick={cancelHandler}>Cancel</button>
                    <button>Submit</button>
                </div>
            </Form>
        </div>
    );
};

export default LocationForm;