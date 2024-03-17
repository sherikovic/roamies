import { useState } from 'react';
import { authUser } from 'util/api';
import { User } from 'types/user';
import { useNavigate } from 'react-router';

import googleIcon from '../images/googlelogo.svg';
import emailIcon from '../images/emailicon.png';
import passwordIcon from '../images/passwordicon.png';
import personalIcon from '../images/personalicon.png';
import styles from './SignupForm.module.css';
import LoginForm from './LoginForm';

const SignupForm: React.FC = (props) => {
	const navigate = useNavigate();
	const [showLoginPage, setShowLoginPage] = useState(false);
	const [invalidFirstName, setInvalidFirstName] = useState(false);
	const [invalidLastName, setInvalidLastName] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidPassword, setInvalidPassword] = useState(false);

	const submitLoginForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		data.get('firstname') === ''
			? setInvalidFirstName(true)
			: setInvalidFirstName(false);
		data.get('secondname') === ''
			? setInvalidLastName(true)
			: setInvalidLastName(false);
		data.get('email') === '' ? setInvalidEmail(true) : setInvalidEmail(false);
		data.get('password') === ''
			? setInvalidPassword(true)
			: setInvalidPassword(false);
		if (invalidEmail === false && invalidPassword === false) {
			const formData: User | any = Object.fromEntries(data.entries());
			const res = await authUser('signup', formData);
			// if (!res?.error) navigate('/settings');
		}
	};

	const validateFirstName = (e: any) => {
		e.target.value === ''
			? setInvalidFirstName(true)
			: setInvalidFirstName(false);
	};
	const validateLastName = (e: any) => {
		e.target.value === ''
			? setInvalidLastName(true)
			: setInvalidLastName(false);
	};
	const validateEmail = (e: any) => {
		const re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		if (re.test(e.target.value)) {
			setInvalidEmail(false);
		} else {
			setInvalidEmail(true);
		}
	};
	const validatePassword = (e: any) => {
		e.target.value === ''
			? setInvalidPassword(true)
			: setInvalidPassword(false);
	};

	return (
		<div>
			<form method='post' className={styles.form} onSubmit={submitLoginForm}>
				<div className={styles.form_content}>
					<section className={styles.left_side}>
						<header>Sign up faster with</header>
						<button name='google' type='button'>
							<img
								src={googleIcon}
								alt='Google logo'
								className={styles.googlelogo}
							/>
							<p>Google</p>
						</button>
					</section>
					<section className={styles.separator}>
						<span>or</span>
					</section>
					<section className={styles.right_side}>
						<header>Sign up with email</header>
						<div className={styles.su_input_flnames}>
							<div className={styles.su_input_field}>
								<label htmlFor='firstname'>
									<img
										src={personalIcon}
										alt='personal icon'
										className={styles.icon}
									/>
								</label>
								<input
									type='firstname'
									name='firstname'
									id='firstname'
									placeholder='First Name'
									className={invalidFirstName ? styles.invalid : ''}
									onChange={validateFirstName}
								/>
							</div>
							<div className={styles.su_input_field}>
								<label htmlFor='lastname'>
									<img
										src={personalIcon}
										alt='personal icon'
										className={styles.icon}
									/>
								</label>
								<input
									type='lastname'
									name='lastname'
									id='lastname'
									placeholder='Last Name'
									className={invalidLastName ? styles.invalid : ''}
									onChange={validateLastName}
								/>
							</div>
						</div>
						<div className={styles.su_input_field}>
							<label htmlFor='email'>
								<img src={emailIcon} alt='email icon' className={styles.icon} />
							</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								className={invalidEmail ? styles.invalid : ''}
								onChange={validateEmail}
							/>
						</div>
						<div className={styles.su_input_field}>
							<label htmlFor='password'>
								<img
									src={passwordIcon}
									alt='password icon'
									className={styles.icon}
								/>
							</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='Password'
								className={invalidPassword ? styles.invalid : ''}
								onChange={validatePassword}
							/>
						</div>
						<div className={styles.actions}>
							<button name='signup' type='submit'>
								Sign up
							</button>
						</div>
					</section>
				</div>
				<section className={styles.footer}>
					<span>
						Already have an account?
						<button onClick={() => setShowLoginPage(true)}>Log in</button>
					</span>
				</section>
			</form>
			{showLoginPage && (
				<div className={styles.card_overlay}>
					<div className={styles.overlay_content}>
						<LoginForm cancelHandler={() => setShowLoginPage(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default SignupForm;
