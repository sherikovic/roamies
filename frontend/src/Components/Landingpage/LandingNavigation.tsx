import { useState } from "react";
import {
	Link,
	NavLink,
	useLocation,
	useRouteLoaderData,
} from "react-router-dom";

import LoginForm from "../Auth/LoginForm";
import { authUser } from "util/api";
import logo from "../../images/logo.svg";
import {
	CardOverlay,
	LogoLink,
	LogoWhite,
	OverlayContent,
} from "util/common_styles";
import styled from "styled-components";

const LandingNavigation: React.FC = () => {
	const [showLoginOverlay, setShowLoginOverlay] = useState(false);
	const location = useLocation();
	const logIn = useRouteLoaderData("root");

	const logOutHandler = async () => {
		const res = await authUser("logout", null);
		res.status === 200 && window.location.reload();
		// TODO handle errors coming from the logout
	};

	return (
		<LandingNavBar>
			<LogoLink href="/">
				<LogoWhite src={logo} />
			</LogoLink>
			<LandingNavContainer>
				<NavLink to="about" state={{ from: location.pathname }}>
					About
				</NavLink>
				<NavLink to="how-to-use" state={{ from: location.pathname }}>
					How to Use
				</NavLink>
				<NavLink to="faq" state={{ from: location.pathname }}>
					FAQ
				</NavLink>
				<NavLink to="contact" state={{ from: location.pathname }}>
					Contact
				</NavLink>
			</LandingNavContainer>
			{logIn ? (
				<LandingNavLoginOptions>
					<button onClick={logOutHandler}>Log out</button>
				</LandingNavLoginOptions>
			) : (
				<LandingNavLoginOptions>
					<button onClick={() => setShowLoginOverlay(true)}>Log in</button>
					<Link to="signup" state={{ from: location.pathname }}>
						Sign up
					</Link>
				</LandingNavLoginOptions>
			)}
			{showLoginOverlay && (
				<CardOverlay>
					<OverlayContent>
						<LoginForm
							cancelHandler={() => setShowLoginOverlay(false)}
							from={location.pathname}
						/>
					</OverlayContent>
				</CardOverlay>
			)}
		</LandingNavBar>
	);
};

export default LandingNavigation;

const LandingNavBar = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	padding: 20px 60px;
	background-color: #1c2727;
`;

const LandingNavContainer = styled.nav`
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid transparent;
	border-radius: 15px;
	background-color: #2c3333;
	padding: 10px 45px;
	> a {
		margin: 0 30px;
		text-decoration: none;
		color: rgba(208, 202, 202, 0.728);
		&:hover {
			color: white;
		}
	}
	> a.active {
		color: white;
	}
`;

const LandingNavLoginOptions = styled.nav`
	display: flex;
	gap: 10px;
	> button {
		border: 1px solid transparent;
		padding: 5px 15px;
		cursor: pointer;
		border-radius: 15px;
		color: white;
		background-color: transparent;
		text-decoration: none;
		font-size: 15px;
		font-weight: 550;
		&:hover {
			border-color: grey;
		}
	}
	> a {
		border: 1px solid white;
		padding: 5px 15px;
		cursor: pointer;
		border-radius: 15px;
		font-size: 15px;
		font-weight: 550;
		color: black;
		background-color: white;
		text-decoration: none;
		&:hover {
			background-color: rgb(244, 244, 243);
		}
	}
`;
