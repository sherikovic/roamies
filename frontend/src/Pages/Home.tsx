import { useEffect } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';

import styles from './Home.module.css';

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const logIn = useRouteLoaderData('root');

	useEffect(() => {
		!logIn && navigate('/');
	}, [logIn, navigate]);

	return (
		<div className={styles.home_page}>
			<div className={styles.home_body}>
				{/* <div className={styles.side_nav}></div> */}
				<div className={styles.home_contents}>
					<section className={styles.events_layout}></section>
					<section className={styles.trips_layout}></section>
				</div>
				<div className={styles.right_actions}></div>
			</div>
		</div>
	);
};

export default HomePage;
