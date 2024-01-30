import { useRouteLoaderData } from 'react-router-dom';
import ElementForm from '../Components/ElementForm';

const EditElementsPage: React.FC = () => {
    const elementData: any = useRouteLoaderData('element-detail');
    const data: any = useRouteLoaderData('root');

    return (
        <div>
            {/* {data && data.user ? <ElementForm method='patch' data={elementData} /> :
                <div>
                    <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
                </div>
            } */}

        </div>
    );
};

export default EditElementsPage;
