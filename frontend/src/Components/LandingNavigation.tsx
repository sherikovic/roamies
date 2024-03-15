import classes from './LandingNavigation.module.css';

const LandingNavigation: React.FC = () => {
	const currentLocation = window.location.pathname;
	const isAbout = currentLocation === '/about';
	const isHowToUse = currentLocation === '/how-to-use';
	const isFAQ = currentLocation === '/faq';
	const isContact = currentLocation === '/contact';

	return (
		<div>
			<div className={classes.landing_navigation}>
				<nav className={classes.brand}>
					<a href='/'>SYT</a>
				</nav>
				<nav className={classes.landing_nav_container}>
					<a href='about' className={isAbout ? classes.active : ''}>
						About
					</a>
					<a href='how-to-use' className={isHowToUse ? classes.active : ''}>
						How to Use
					</a>
					<a href='faq' className={isFAQ ? classes.active : ''}>
						FAQ
					</a>
					<a href='contact' className={isContact ? classes.active : ''}>
						Contact
					</a>
				</nav>
				<nav className={classes.landing_login}>
					<a href='/auth?mode=login'>Login</a>
					<a href='/auth?mode=login'>Register</a>
				</nav>
			</div>
		</div>
	);
};

export default LandingNavigation;
