import { useState } from "react";
import { authUser } from "util/api";
import { User } from "types/user";
import { useLocation, useNavigate } from "react-router";

import googleIcon from "../../images/googlelogo.svg";
import warningIcon from "../../images/warningicon.png";
import styles from "./LoginForm.module.css";
import { XClose } from "util/common_styles";
import { baseURL } from "util/util";
import styled from "styled-components";

interface LoginFormProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

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
};

const LoginForm: React.FC<LoginFormProps> = ({ cancelHandler }) => {
	const navigate = useNavigate();
	let location = useLocation().pathname;

	const [formInputs, setFormInputs] = useState(fields);
	const [errorMessage, setErrorMessage] = useState("");

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

	const sendAuthRequest = async (mode: string, data: any) => {
		const formData: User | any = Object.fromEntries(data.entries());
		const res = await authUser(mode, formData);
		if (res.status === 201) {
			location.includes("signup") ? navigate(-1) : window.location.reload();
		}
		res.status === 300 && setErrorMessage("A user is already logged in!");
		res.status === 401 &&
			setErrorMessage("Either email or password is invalid!");
		res.status === 500 && setErrorMessage("An error occured.");
	};

	const submitLoginForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const isInvalid = validateInputsForSubmit();
		!isInvalid && sendAuthRequest("login", data);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type: "email" | "password";
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
		<form method="post" className={styles.form} onSubmit={submitLoginForm}>
			<header>Log in</header>
			<XClose type="button" onClick={cancelHandler} />
			<div className={styles.form_content}>
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
				<section className={styles.lf_input_field}>
					<label htmlFor="email" />
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
				</section>
				<section className={styles.lf_input_field}>
					<label htmlFor="password" />
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
				</section>
				<section className={styles.login_options}>
					<div className={styles.checkbox_container}>
						<input type="checkbox" name="remember_me" id="remember_me" />
						<span className={styles.checkmark}></span>
						<label htmlFor="remember_me">Remember me</label>
					</div>
					<div>
						<a href="/">Forgot password?</a>
					</div>
				</section>
				<div className={styles.actions}>
					<Login type="submit">Log in</Login>
					<span>or</span>
					<GoogleLogin
						href={baseURL + "/auth/google?redirect_url=" + document.URL}
					>
						<img
							src={googleIcon}
							alt="Google logo"
							className={styles.googlelogo}
						/>
						<p>Continue with Google</p>
					</GoogleLogin>
					<div>
						<span>Not a member yet?</span>
						<Join href="signup">Join</Join>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;

const Login = styled.button`
	width: 100%;
	font-size: 15px;
	line-height: 1.6;
	cursor: pointer;
	padding: 8px 12px;
	border-radius: 15px;
	background-color: #2c3333;
	color: white;
	border: none;
	&:hover {
		background-color: #1c2727;
	}
`;

const GoogleLogin = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	cursor: pointer;
	padding: 8px 12px;
	border-radius: 15px;
	background-color: white;
	border: 1px solid black;
	text-decoration: none;
	&:hover {
		background-color: rgb(244, 244, 243);
	}
	> p {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
		color: black;
	}
`;

const Join = styled.a`
	width: 25%;
	margin: 10px auto;
	padding: 8px 12px;
	font-size: 15px;
	font-weight: 500;
	line-height: 1.6;
	text-align: center;
	text-decoration: none;
	border-radius: 15px;
	background-color: #2c3333;
	color: white;
	&:hover {
		background-color: #1c2727;
	}
`;
