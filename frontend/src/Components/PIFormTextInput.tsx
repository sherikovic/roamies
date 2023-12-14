import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import classes from './PersonalInfoForm.module.css';
import { useState } from 'react';

interface PIFormTextInputProps {
    name: string;
    children?: React.ReactNode;
};

const PIFormTextInput: React.FC<PIFormTextInputProps> = (props) => {
    const [editMode, setEditMode] = useState(false);

    const editIconHandler = () => {
        setEditMode(!editMode);
    };

    return (
        <div className={classes.pi_form_item}>
            <input
                type="text"
                placeholder={props.name}
                name={props.name}
                id={props.name}
                className={`${classes.pi_input_field} ${editMode && classes.pi_input_field}`}
                disabled={!editMode}
            />
            <label htmlFor={props.name} className={classes.pi_input_label}>
                {props.name.toUpperCase()}
            </label>
            <div onClick={editIconHandler} style={{ color: 'gray' }}>
                <FontAwesomeIcon icon={editMode ? faSave : faEdit} />
            </div>
        </div >
    );
};

export default PIFormTextInput;
