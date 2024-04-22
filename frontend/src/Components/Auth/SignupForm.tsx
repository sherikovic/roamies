import { useEffect, useState } from "react";
import { authUser } from "util/api";
import { User } from "types/user";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import googleIcon from "../../images/googlelogo.svg";
import emailIcon from "../../images/emailicon.png";
import passwordIcon from "../../images/passwordicon.png";
import personalIcon from "../../images/personalicon.png";
import warningIcon from "../../images/warningicon.png";

import LoginForm from "./LoginForm";
import { CardOverlay, OverlayContent } from "util/common_styles";
import { baseURL, clientUrl } from "util/util";
import styled from "styled-components";

const fields = {
	password: {
		val: "",
		valid: true,
		errorMessage: "Please enter valid password.",
	},
	email: {
		val: "",
		valid: true,
		errorMessage: "Please enter valid email address.",
	},
	lastName: {
		val: "",
		valid: true,
		errorMessage: "Please enter valid last name.",
	},
	firstName: {
		val: "",
		valid: true,
		errorMessage: "Please enter valid first name.",
	},
};

const SignupForm: React.FC = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [searchParams]: any = useSearchParams();

	const [formInputs, setFormInputs] = useState(fields);
	const [showLoginPage, setShowLoginPage] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (searchParams.get("redirect")) {
			setErrorMessage(searchParams.get("error"));
		}
	}, []);

	const validateInputsForSubmit = () => {
		let isInvalid = false;
		Object.keys(formInputs).forEach((key: any) => {
			const input = formInputs[key];
			if (
				input.val === "" ||
				(key === "email" &&
					!/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.val))
			) {
				isInvalid = true;
				setErrorMessage(input.errorMessage);
				setFormInputs((prev) => ({
					...prev,
					[key]: { ...input, valid: false },
				}));
			}
		});
		return isInvalid;
	};

	const sendAuthRequest = async (path: string, data?: any) => {
		const formData: User | any = data
			? Object.fromEntries(data.entries())
			: null;
		const res = await authUser(path, formData);
		res.status === 201 ? navigate(-1) : setErrorMessage(res.getJson.message);
	};

	const submitSignupForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const isInvalid = validateInputsForSubmit();
		!isInvalid && sendAuthRequest("signupLocal", data);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type: "firstName" | "lastName" | "email" | "password";
		value: string;
	}) => {
		setFormInputs({
			...formInputs,
			[type]: {
				...formInputs[type],
				val: value,
				valid:
					type === "email"
						? /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) ||
						  value === ""
							? true
							: false
						: true,
			},
		});
		setErrorMessage("");
	};

	return (
		<div>
			<Signup method="post" onSubmit={submitSignupForm}>
				<FlexboxCol>
					<EmailSingup>
						<SignupHeader>Create new account</SignupHeader>
						{errorMessage !== "" && (
							<Error>
								<Img src={warningIcon} alt="warning icon" />
								{errorMessage}
							</Error>
						)}
						{process.env.NODE_ENV === "production" && (
							<Info>
								<Img src={warningIcon} alt="warning icon" />
								We're currently still in development, sign up is disabled, check
								us out later ^^
							</Info>
						)}
						<FirstLastNamesSection>
							<InputSection $isInvalid={!formInputs["firstName"].valid}>
								<label htmlFor="firstname">
									<Icon src={personalIcon} alt="personal icon" $left={140} />
								</label>
								<input
									type="firstname"
									name="firstname"
									id="firstname"
									placeholder="First Name"
									onChange={(e) =>
										inputOnChange({ type: "firstName", value: e.target.value })
									}
								/>
							</InputSection>
							<InputSection $isInvalid={!formInputs["lastName"].valid}>
								<label htmlFor="lastname">
									<Icon src={personalIcon} alt="personal icon" $left={140} />
								</label>
								<input
									type="lastname"
									name="lastname"
									id="lastname"
									placeholder="Last Name"
									onChange={(e) =>
										inputOnChange({ type: "lastName", value: e.target.value })
									}
								/>
							</InputSection>
						</FirstLastNamesSection>
						<InputSection $isInvalid={!formInputs["email"].valid}>
							<label htmlFor="email">
								<Icon src={emailIcon} alt="email icon" $left={315} />
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								onChange={(e) =>
									inputOnChange({ type: "email", value: e.target.value })
								}
							/>
						</InputSection>
						<InputSection $isInvalid={!formInputs["password"].valid}>
							<label htmlFor="password">
								<Icon src={passwordIcon} alt="password icon" $left={315} />
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								onChange={(e) =>
									inputOnChange({ type: "password", value: e.target.value })
								}
							/>
						</InputSection>
						<SignupBtn
							name="signup"
							type="submit"
							disabled={process.env.NODE_ENV === "production" ? true : false}
						>
							Sign up
						</SignupBtn>
					</EmailSingup>
					<Separator>or</Separator>
					<GoogleSignup>
						<GoogleBtn
							href={
								process.env.NODE_ENV === "production"
									? "#"
									: baseURL +
									  "/auth/google?redirect_url=" +
									  clientUrl +
									  state.from
							}
						>
							<Img src={googleIcon} alt="Google logo" />
							<p>Google</p>
						</GoogleBtn>
					</GoogleSignup>
				</FlexboxCol>
				<Footer>
					<span>Already have an account?</span>
					<button type="button" onClick={() => setShowLoginPage(true)}>
						Log in
					</button>
				</Footer>
			</Signup>
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

export default SignupForm;

const Signup = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	border-radius: 8px;
	width: 340px;
`;

const FlexboxCol = styled.div`
	display: flex;
	flex-direction: column;
`;

const EmailSingup = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

const SignupHeader = styled.header`
	font-size: 50px;
	font-weight: 550;
	color: white;
	margin: 0;
	text-align: left;
	padding-bottom: 20px;
	line-height: 50px;
	text-wrap: pretty;
`;

const Icon = styled.img<{ $left: number }>`
	height: 18px;
	width: 18px;
	min-height: 18px;
	min-width: 18px;
	margin-right: 8px;
	text-indent: 0px;
	position: absolute;
	top: 10px;
	left: ${(p) => p.$left}px;
	z-index: 2;
`;

const Img = styled.img`
	height: 18px;
	width: 18px;
	min-height: 18px;
	min-width: 18px;
	margin-right: 8px;
	text-indent: 0px;
`;

const FirstLastNamesSection = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
	gap: 10px;
`;

const InputSection = styled.section<{ $isInvalid: boolean }>`
	padding: 10px 0px;
	> input {
		position: relative;
		width: 100%;
		background-color: rgb(27 29 39);
		border: 0.1px solid transparent;
		border-radius: 15px;
		padding: 12px 4px;
		padding-left: 25px;
		font-size: 15px;
		color: white;
		${(p) => p.$isInvalid && "border-color: rgba(255, 0, 0, 0.296);"}
		&:focus {
			outline: none;
			border: 1.5px solid grey;
		}
		&::placeholder {
			color: rgba(128, 128, 128, 0.966);
		}
	}
	> label {
		position: absolute;
	}
`;

const SignupBtn = styled.button`
	margin-top: 30px;
	width: 100%;
	font-size: 15px;
	line-height: 1.6;
	cursor: pointer;
	padding: 8px 12px;
	border-radius: 15px;
	/* background-color: rgb(32 77 136); */
	background-color: #2c3333;
	color: white;
	border: none;
	&:hover {
		/* background-color: rgb(37, 88, 155); */
		background-color: #1c2727;
	}
`;

const Separator = styled.span`
	text-align: center;
	margin: auto;
	width: 15%;
	font-size: 15px;
	font-weight: 500;
	line-height: 0.7;
	color: grey;
	padding: 20px 0;
`;

const GoogleSignup = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: auto;
	width: 100%;
`;

const GoogleBtn = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	cursor: pointer;
	padding: 8px 12px;
	text-decoration: none;
	border-radius: 15px;
	background-color: white;
	border: 1px solid black;
	&:hover {
		background-color: rgba(240, 240, 240, 0.827);
	}
	> p {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
		color: black;
	}
`;

const Footer = styled.section`
	margin-top: 30px;
	text-align: center;
	> span {
		padding: 20px 10px;
		text-align: center;
		font-size: 15px;
		font-weight: 500;
		line-height: 0.7;
		color: grey;
	}
	> button {
		font-size: 15px;
		font-weight: 500;
		line-height: 1.6;
		text-decoration: underline;
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		&:hover {
			text-decoration: none;
		}
	}
`;

const Error = styled.p`
	border: 1px solid #eac8c8;
	background-color: #eac8c8;
	font-size: 14px;
	color: #6c2f2f;
	margin-top: 10px;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Info = styled.p`
	border: 1px solid #9cae9c;
	background-color: #9cae9c;
	width: 100%;
	font-size: 14px;
	color: #152515;
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
