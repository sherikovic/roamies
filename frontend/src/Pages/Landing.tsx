import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useRouteLoaderData } from "react-router";

import LoginForm from "Components/Auth/LoginForm";
import {
	CardOverlay,
	FlexboxCol,
	LogoLink,
	LogoWhite,
	OverlayContent,
} from "util/common_styles";
import landing from "../images/landing_page.jpeg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "util/auth-context";

const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showLoginPage, setShowLoginPage] = useState(false);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.isAuthenticated && navigate("/home");
	}, [authContext.isAuthenticated, navigate]);

	return (
		<FlexboxCol>
			<LandingPageBackground />
			<LandingPageNavigation>
				<LogoLink href="/">
					<LogoWhite src={logo} />
				</LogoLink>
				<LandingPageNavigationContainer>
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
				</LandingPageNavigationContainer>
				<LoginBtn onClick={() => setShowLoginPage(true)}>Log in</LoginBtn>
			</LandingPageNavigation>
			<LandingPageMainText>
				<p>It's better, together!</p>
				<p>From solo traverels, for solo traverels.</p>
			</LandingPageMainText>
			<LandingPageJoinLink>
				<Link to="/signup" state={{ from: location.pathname }}>
					Join the Community
				</Link>
			</LandingPageJoinLink>
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
		</FlexboxCol>
	);
};

export default LandingPage;

const LandingPageBackground = styled.div`
	display: block;
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url(${landing});
	filter: brightness(0.5);
	&::before {
		content: "";
		display: block;
		width: 100%;
		height: 100%;
		background-color: rgba(46, 45, 53, 0.527);
	}
`;

const LandingPageNavigation = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	padding: 20px 60px;
	background-color: transparent;
`;

const LandingPageNavigationContainer = styled.nav`
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid transparent;
	border-radius: 15px;
	background-color: #00000029;
	padding: 10px 45px;
	> a {
		margin: 0 30px;
		text-decoration: none;
		color: rgba(208, 202, 202, 0.926);
		&:hover {
			color: white;
		}
	}
	> a.active {
		color: white;
	}
`;

const LoginBtn = styled.button`
	border: 1px solid transparent;
	padding: 10px 15px;
	cursor: pointer;
	border-radius: 15px;
	color: rgba(208, 202, 202, 0.926);
	background-color: #00000029;
	text-decoration: none;
	font-size: 15px;
	font-weight: 550;
	&:hover {
		background-color: rgba(244, 244, 243, 0.105);
		color: white;
	}
`;

const LandingPageMainText = styled.div`
	> p:first-child {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 40%;
		margin: auto;
		font-size: 100px;
		color: white;
	}
	> p:last-child {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 50%;
		margin: auto;
		font-size: 30px;
		color: white;
	}
`;

const LandingPageJoinLink = styled.div`
	> a {
		position: absolute;
		top: 70%;
		left: 20%;
		margin: auto;
		border: 1px transparent;
		border-radius: 15px;
		padding: 15px 40px;
		/* background-color: rgb(36, 48, 64); */
		background-color: #2c3333;
		/* box-shadow: 1px 2px 2px #696262; */
		color: white;
		text-decoration: none;
		&:hover {
			/* background-color: rgba(36, 48, 64, 0.597); */
			background-color: #1c2727;
		}
	}
`;
