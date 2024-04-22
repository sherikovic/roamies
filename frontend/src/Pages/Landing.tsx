import { useEffect, useState } from "react";
import { useNavigate, useLocation, useRouteLoaderData } from "react-router";

import styles from "./Landing.module.css";
import LoginForm from "Components/Auth/LoginForm";
import {
	CardOverlay,
	LogoLink,
	LogoWhite,
	OverlayContent,
} from "util/common_styles";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showLoginPage, setShowLoginPage] = useState(false);
	const logIn = useRouteLoaderData("root");

	useEffect(() => {
		logIn && navigate("/home");
	}, [logIn, navigate]);

	return (
		<div className={styles.landing_page}>
			<div className={styles.background_image}></div>
			<div className={styles.landing_navigation}>
				<LogoLink href="/">
					<LogoWhite src={logo} />
				</LogoLink>
				<nav className={styles.landing_nav_container}>
					<Link to="/about" state={{ from: location.pathname }}>
						About
					</Link>
					<Link to="/how-to-use" state={{ from: location.pathname }}>
						How to Use
					</Link>
					<Link to="/faq" state={{ from: location.pathname }}>
						FAQ
					</Link>
					<Link to="/contact" state={{ from: location.pathname }}>
						Contact
					</Link>
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
				<Link to="/signup" state={{ from: location.pathname }}>
					Join the Community
				</Link>
			</div>
			{showLoginPage && (
				<CardOverlay>
					<OverlayContent>
						<LoginForm
							cancelHandler={() => setShowLoginPage(false)}
							from={"/"}
						/>
					</OverlayContent>
				</CardOverlay>
			)}
		</div>
	);
};

export default LandingPage;
