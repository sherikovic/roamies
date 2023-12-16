interface PIFormTextInputLabelProps {
    name: string;
    classDiv?: string;
    classInput?: string;
    classLabel?: string;
    children?: React.ReactNode;
};

const PIFormTextInputLabel: React.FC<PIFormTextInputLabelProps> = (props) => {
    return (
        <div className={props.classDiv}>
            <input
                type="text"
                placeholder={props.name}
                name={props.name}
                id={props.name}
                className={props.classInput}
            />
            <label htmlFor={props.name} className={props.classLabel}>
                {props.name.toUpperCase()}
            </label>
        </div >
    );
};

export default PIFormTextInputLabel;
