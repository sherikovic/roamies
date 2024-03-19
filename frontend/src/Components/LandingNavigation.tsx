import { useState } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

import styles from './LandingNavigation.module.css';
import LoginForm from './LoginForm';

import { authUser } from 'util/api';

const LandingNavigation: React.FC = () => {
	const [showLoginOverlay, setShowLoginOverlay] = useState(false);
	const logIn = useRouteLoaderData('root');

	const logOutHandler = async () => {
		const res = await authUser('logout', null);
		res.status === 200 && window.location.reload();
		// TODO handler errors coming from the logout
	};

	return (
		<div className={styles.landing_navigation}>
			<nav className={styles.brand}>
				<a href='/'>SYT</a>
			</nav>
			<nav className={styles.landing_nav_container}>
				<NavLink
					to='about'
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					About
				</NavLink>
				<NavLink
					to='how-to-use'
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					How to Use
				</NavLink>
				<NavLink
					to='faq'
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					FAQ
				</NavLink>
				<NavLink
					to='contact'
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					Contact
				</NavLink>
			</nav>
			{logIn ? (
				<nav className={styles.landing_login}>
					<button onClick={logOutHandler}>Log out</button>
				</nav>
			) : (
				<nav className={styles.landing_login}>
					<button onClick={() => setShowLoginOverlay(true)}>Log in</button>
					<a href='signup'>Sign up</a>
				</nav>
			)}
			{showLoginOverlay && (
				<div className={styles.card_overlay}>
					<div className={styles.overlay_content}>
						<LoginForm cancelHandler={() => setShowLoginOverlay(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default LandingNavigation;
