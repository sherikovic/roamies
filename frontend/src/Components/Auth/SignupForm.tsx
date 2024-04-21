import { useEffect, useState } from "react";
import { authUser } from "util/api";
import { User } from "types/user";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import googleIcon from "../../images/googlelogo.svg";
import emailIcon from "../../images/emailicon.png";
import passwordIcon from "../../images/passwordicon.png";
import personalIcon from "../../images/personalicon.png";
import warningIcon from "../../images/warningicon.png";

import styles from "./SignupForm.module.css";
import LoginForm from "./LoginForm";
import { CardOverlay, OverlayContent } from "util/common_styles";
import { baseURL } from "util/util";
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
			<form method="post" className={styles.form} onSubmit={submitSignupForm}>
				<div className={styles.form_content}>
					<section className={styles.email_login}>
						<header>Create new account</header>
						{errorMessage !== "" && (
							<p className={styles.error}>
								<img
									src={warningIcon}
									alt="warning icon"
									className={styles.warningIcon}
								/>
								{errorMessage}
							</p>
						)}
						<div className={styles.su_input_flnames}>
							<div className={styles.su_input_field}>
								<label htmlFor="firstname">
									<img
										src={personalIcon}
										alt="personal icon"
										className={`${styles.icon} ${styles.flicon}`}
									/>
								</label>
								<input
									type="firstname"
									name="firstname"
									id="firstname"
									placeholder="First Name"
									className={
										formInputs["firstName"].valid ? "" : styles.invalid
									}
									onChange={(e) =>
										inputOnChange({ type: "firstName", value: e.target.value })
									}
								/>
							</div>
							<div className={styles.su_input_field}>
								<label htmlFor="lastname">
									<img
										src={personalIcon}
										alt="personal icon"
										className={`${styles.icon} ${styles.flicon}`}
									/>
								</label>
								<input
									type="lastname"
									name="lastname"
									id="lastname"
									placeholder="Last Name"
									className={formInputs["lastName"].valid ? "" : styles.invalid}
									onChange={(e) =>
										inputOnChange({ type: "lastName", value: e.target.value })
									}
								/>
							</div>
						</div>
						<div className={styles.su_input_field}>
							<label htmlFor="email">
								<img
									src={emailIcon}
									alt="email icon"
									className={`${styles.icon} ${styles.epicon}`}
								/>
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								className={formInputs["email"].valid ? "" : styles.invalid}
								onChange={(e) =>
									inputOnChange({ type: "email", value: e.target.value })
								}
							/>
						</div>
						<div className={styles.su_input_field}>
							<label htmlFor="password">
								<img
									src={passwordIcon}
									alt="password icon"
									className={`${styles.icon} ${styles.epicon}`}
								/>
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								className={formInputs["password"].valid ? "" : styles.invalid}
								onChange={(e) =>
									inputOnChange({ type: "password", value: e.target.value })
								}
							/>
						</div>
						<div>
							<button name="signup" type="submit">
								Sign up
							</button>
						</div>
					</section>
					<section className={styles.separator}>
						<span>or</span>
					</section>
					<section className={styles.other_login}>
						<GoogleSignup
							href={baseURL + "/auth/google?redirect_url=http://localhost:3000"}
						>
							<img
								src={googleIcon}
								alt="Google logo"
								className={styles.googlelogo}
							/>
							<p>Google</p>
						</GoogleSignup>
					</section>
				</div>
				<section className={styles.footer}>
					<span>
						Already have an account?
						<button type="button" onClick={() => setShowLoginPage(true)}>
							Log in
						</button>
					</span>
				</section>
			</form>
			{showLoginPage && (
				<CardOverlay>
					<OverlayContent>
						<LoginForm cancelHandler={() => setShowLoginPage(false)} />
					</OverlayContent>
				</CardOverlay>
			)}
		</div>
	);
};

export default SignupForm;

const GoogleSignup = styled.a`
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
