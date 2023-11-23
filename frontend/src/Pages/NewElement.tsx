import { useRouteLoaderData } from 'react-router-dom';
import ElementForm from '../Components/ElementForm';

const NewElementPage: React.FC = () => {
    const data: any = useRouteLoaderData('root');

    return (
        <>
            {data && data.user ? <ElementForm method='post' /> :
                <div>
                    <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
                </div>
            }
        </>
    );
};

export default NewElementPage;
