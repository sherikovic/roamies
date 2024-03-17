import { useState } from 'react';
import styles from './Landing.module.css';
import LoginForm from 'Components/LoginForm';

const LandingPage: React.FC = () => {
	const [showLoginPage, setShowLoginPage] = useState(false);

	return (
		<div className={styles.landing_page}>
			<div className={styles.background_image}></div>
			<div className={styles.landing_navigation}>
				<nav className={styles.brand}>
					<a href='/'>SYT</a>
				</nav>
				<nav className={styles.landing_nav_container}>
					<a href='/about'>About</a>
					<a href='/how-to-use'>How to Use</a>
					<a href='/faq'>FAQ</a>
					<a href='/contact'>Contact</a>
				</nav>
				<nav className={styles.landing_login}>
					<button onClick={() => setShowLoginPage(true)}>Log in</button>
				</nav>
			</div>
			<div className={styles.main_text}>
				<p>It's better, together!</p>
				<p>From solo traverels, for solo traverels.</p>
			</div>
			<div className={styles.join_link}>
				<a href='/signup'>Join the Community</a>
			</div>
			{showLoginPage && (
				<div className={styles.card_overlay}>
					<div className={styles.overlay_content}>
						<LoginForm cancelHandler={() => setShowLoginPage(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default LandingPage;
