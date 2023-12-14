interface PIFormTextInputProps {
    name: string;
    CN_div: string;
    CN_input: string;
    CN_label: string;
    children?: React.ReactNode;
};

const PIFormTextInput: React.FC<PIFormTextInputProps> = (props) => {
    return (
        <div className={props.CN_div}>
            <input
                type="text"
                placeholder={props.name}
                name={props.name}
                id={props.name}
                className={props.CN_input}
            />
            <label htmlFor={props.name} className={props.CN_label}>
                {props.name.toUpperCase()}
            </label>
        </div>
    );
};

export default PIFormTextInput;