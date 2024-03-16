import { useState } from 'react';
import styles from './LandingNavigation.module.css';
import LoginPage from 'Pages/Login';

const LandingNavigation: React.FC = () => {
	// could use NavLink instead of all this
	const currentLocation = window.location.pathname;
	const isAbout = currentLocation === '/about';
	const isHowToUse = currentLocation === '/how-to-use';
	const isFAQ = currentLocation === '/faq';
	const isContact = currentLocation === '/contact';
	const [showLoginPage, setShowLoginPage] = useState(false);

	return (
		<div className={styles.landing_navigation}>
			<nav className={styles.brand}>
				<a href='/'>SYT</a>
			</nav>
			<nav className={styles.landing_nav_container}>
				<a href='about' className={isAbout ? styles.active : ''}>
					About
				</a>
				<a href='how-to-use' className={isHowToUse ? styles.active : ''}>
					How to Use
				</a>
				<a href='faq' className={isFAQ ? styles.active : ''}>
					FAQ
				</a>
				<a href='contact' className={isContact ? styles.active : ''}>
					Contact
				</a>
			</nav>
			<nav className={styles.landing_login}>
				<button onClick={() => setShowLoginPage(true)}>Log in</button>
				<button>Register</button>
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
