import SignupForm from "Components/Auth/SignupForm";
import styles from "./Signup.module.css";
import { useRouteLoaderData } from "react-router";

import logo from "../images/logo.svg";
import { LogoLink, LogoWhite } from "util/common_styles";

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
					<div className={styles.background_image}></div>
					<div className={styles.signup_page}>
						<div className={styles.header}>
							<LogoLink href="/">
								<LogoWhite src={logo} />
							</LogoLink>
						</div>
						<div className={styles.signup_content}>
							<section className={styles.signup_text}>
								<p>JOIN FOR FREE</p>
								<p>Share your travels with other solo travelers.</p>
							</section>
							<section className={styles.signup_form}>
								<SignupForm />
							</section>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SignupPage;
