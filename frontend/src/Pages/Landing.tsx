import classes from './Landing.module.css';

const LandingPage: React.FC = () => {
	return (
		<div className={classes.landing_page}>
			<div className={classes.background_image}></div>
			<div className={classes.landing_navigation}>
				<nav className={classes.brand}>
					<a href='/'>SYT</a>
				</nav>
				<nav className={classes.landing_nav_container}>
					<a href='/about'>About</a>
					<a href='/how-to-use'>How to Use</a>
					<a href='/faq'>FAQ</a>
					<a href='/contact'>Contact</a>
				</nav>
				<nav className={classes.landing_login}>
					<a href='/auth?mode=login'>Login</a>
				</nav>
			</div>
			<div className={classes.main_text}>
				<p>It's better, together!</p>
				<p>From solo traverels, for solo traverels.</p>
			</div>
			<div className={classes.join_link}>
				<a href='/auth?mode=signup'>Join the Community</a>
			</div>
		</div>
	);
};

export default LandingPage;
