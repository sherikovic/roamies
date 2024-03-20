interface ErrorContentProps {
    title: String;
    children?: React.ReactNode;
}

const ErrorContent: React.FC<ErrorContentProps> = (props) => {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>{props.title}</h1>
            <p>{props.children}</p>
        </div>
    );
};

export default ErrorContent;