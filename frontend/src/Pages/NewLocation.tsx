import { ActionFunction } from "react-router-dom";

const NewLocationPage: React.FC = () => {
    return (
        <>
            <p>New Location Page</p>
        </>
    );
};

export default NewLocationPage;

export const action: ActionFunction = async ({ request, params }) => {
    return null;
}