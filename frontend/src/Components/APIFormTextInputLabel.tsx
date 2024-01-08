interface APIFormTextInputLabelProps {
    type: string;
    name: string;
    value: string;
    classDiv?: string;
    classInput?: string;
    classLabel?: string;
    children?: React.ReactNode;
};

const APIFormTextInputLabel: React.FC<APIFormTextInputLabelProps> = (props) => {
    return (
        <div className={props.classDiv}>
            <input
                type={props.type}
                placeholder={props.name}
                name={props.name}
                id={props.name}
                defaultValue={props.value}
                className={props.classInput}
            />
            <label htmlFor={props.name} className={props.classLabel}>
                {props.name.toUpperCase()}
            </label>
        </div >
    );
};

export default APIFormTextInputLabel;
