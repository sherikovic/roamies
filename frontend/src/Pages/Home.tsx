import { useEffect } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const logIn = useRouteLoaderData('root');

	useEffect(() => {
		!logIn && navigate('/');
	}, [logIn, navigate]);

	return <></>;
};

export default HomePage;
