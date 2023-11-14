import { useRouteLoaderData } from 'react-router-dom';
import ElementForm from '../Components/ElementForm';

const EditElementsPage: React.FC = () => {
    const elementData: any = useRouteLoaderData('element-detail');
    return (
        <ElementForm method='patch' data={elementData} />
    );
};

export default EditElementsPage;
