import SignupForm from "Components/Auth/SignupForm";
import { useRouteLoaderData } from "react-router";
import signup from "../images/signup.jpeg";

import logo from "../images/logo.svg";
import { LogoLink, LogoWhite } from "util/common_styles";
import styled from "styled-components";

const SignupPage: React.FC = () => {
	const logIn = useRouteLoaderData("root");

	return (
		<div>
			{logIn ? (
				<h4 style={{ textAlign: "center" }}>
					You are not authorized to view this page!
				</h4>
			) : (
				<div>
					<SignupBackground />
					<SignupPageLayout>
						<SignupHeader>
							<LogoLink href="/">
								<LogoWhite src={logo} />
							</LogoLink>
						</SignupHeader>
						<SignupContent>
							<SignupText>
								<p>JOIN FOR FREE</p>
								<p>Share your travels with other solo travelers.</p>
							</SignupText>
							<SignupFormLayout>
								<SignupForm />
							</SignupFormLayout>
						</SignupContent>
					</SignupPageLayout>
				</div>
			)}
		</div>
	);
};

export default SignupPage;

const SignupBackground = styled.div`
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	background-size: 50% 100%;
	background-position: left;
	background-repeat: no-repeat;
	background-image: url(${signup});
	filter: brightness(0.5);
	&::before {
		content: "";
		display: block;
		position: inherit;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to right,
			rgba(18, 18, 24, 0.63) 15%,
			rgb(40, 42, 54) 45%
		);
	}
`;

const SignupPageLayout = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: stretch;
	justify-content: stretch;
	height: 100vh;
`;

const SignupHeader = styled.div`
	padding: 20px 60px;
`;

const SignupContent = styled.div`
	display: flex;
	justify-content: center;
	margin: 70px 50px 70px 130px;
	height: 100%;
	gap: 150px;
`;

const SignupText = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 120px;
	> p {
		color: white;
		font-size: 35px;
		line-height: 50px;
		margin: 0;
		&:first-child {
			font-size: 20px;
		}
	}
`;

const SignupFormLayout = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
`;
