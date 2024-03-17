import { useState } from 'react';
import styles from './LandingNavigation.module.css';
import LoginPage from 'Pages/Login';
import { NavLink } from 'react-router-dom';

const LandingNavigation: React.FC = () => {
	const [showLoginPage, setShowLoginPage] = useState(false);

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
			<nav className={styles.landing_login}>
				<button onClick={() => setShowLoginPage(true)}>Log in</button>
				<a href='signup'>Sign up</a>
			</nav>
			{showLoginPage && (
				<div className={styles.card_overlay}>
					<div className={styles.overlay_content}>
						<LoginPage cancelHandler={() => setShowLoginPage(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default LandingNavigation;
