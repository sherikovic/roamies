import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

interface PIFormTextInputLabelProps {
    name: string;
    classDiv?: string;
    classInput?: string;
    classLabel?: string;
    children?: React.ReactNode;
};

const PIFormTextInputLabel: React.FC<PIFormTextInputLabelProps> = (props) => {
    const [editMode, setEditMode] = useState(false);

    const editIconHandler = () => {
        setEditMode(!editMode);
    };

    return (
        <div className={props.classDiv}>
            <input
                type="text"
                placeholder={props.name}
                name={props.name}
                id={props.name}
                className={props.classInput}
                disabled={!editMode}
            />
            <label htmlFor={props.name} className={props.classLabel}>
                {props.name.toUpperCase()}
            </label>
            <div onClick={editIconHandler} style={{ color: 'gray' }}>
                <FontAwesomeIcon icon={editMode ? faSave : faEdit} />
            </div>
        </div >
    );
};

export default PIFormTextInputLabel;
