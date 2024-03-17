import { useState } from 'react';
import { authUser } from 'util/api';
import { User } from 'types/user';
import { useNavigate } from 'react-router';

import googleIcon from '../images/googlelogo.svg';
import emailIcon from '../images/emailicon.png';
import passwordIcon from '../images/passwordicon.png';
import personalIcon from '../images/personalicon.png';
import warningIcon from '../images/warningicon.png';

import styles from './SignupForm.module.css';
import LoginForm from './LoginForm';

const SignupForm: React.FC = () => {
	const navigate = useNavigate();
	const [showLoginPage, setShowLoginPage] = useState(false);
	const [firstName, setFirstName] = useState({ val: '', ok: false });
	const [lastName, setLastName] = useState({ val: '', ok: false });
	const [email, setEmail] = useState({ val: '', ok: false });
	const [password, setPassword] = useState({ val: '', ok: false });
	const [errorMessage, setErrorMessage] = useState('');

	const submitSignupForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);

		// if (password.val === '') {
		// 	setPassword((prev) => ({ ...prev, ok: true }));
		// 	setErrorMessage((prev) => 'Enter a valid password.');
		// } else {
		// 	setPassword((prev) => ({ ...prev, ok: false }));
		// 	setErrorMessage((prev) => '');
		// }
		// if (email.val === '') {
		// 	setEmail((prev) => ({ ...prev, ok: true }));
		// 	setErrorMessage((prev) => 'Enter a valid email.');
		// } else {
		// 	setEmail((prev) => ({ ...prev, ok: false }));
		// 	setErrorMessage((prev) => '');
		// }
		// if (lastName.val === '') {
		// 	setLastName((prev) => ({ ...prev, ok: true }));
		// 	setErrorMessage((prev) => 'Enter a valid last name.');
		// } else {
		// 	setLastName((prev) => ({ ...prev, ok: false }));
		// 	setErrorMessage((prev) => '');
		// }
		// if (firstName.val === '') {
		// 	setFirstName((prev) => ({ ...prev, ok: true }));
		// 	setErrorMessage((prev) => 'Enter a valid first name.');
		// } else {
		// 	setFirstName((prev) => ({ ...prev, ok: false }));
		// 	setErrorMessage((prev) => '');
		// }

		validatePassword(password.val);
		validateEmail(email.val);
		validateLastName(lastName.val);
		validateFirstName(firstName.val);

		if (!firstName.ok && !lastName.ok && !email.ok && !password.ok) {
			const formData: User | any = Object.fromEntries(data.entries());
			const res = await authUser('signup', formData);
			if (res.status === 201) {
				// setErrorMessage('');
				navigate('/trips');
			} else {
				console.log(res.getJson);
				// setErrorMessage('ssss');
			}
		}
	};

	// useEffect(() => {
	// 	validateFirstName(firstName);
	// 	validateLastName(lastName);
	// 	validateEmail(email);
	// 	validatePassword(password);

	// 	invalidPassword && setErrorMessage('Enter a valid password.');
	// 	invalidEmail && setErrorMessage('Enter a valid email address.');
	// 	invalidLastName && setErrorMessage('Enter a valid last name.');
	// 	invalidFirstName && setErrorMessage('Enter a valid first name.');
	// }, [firstName, lastName, email, password]);

	const validateFirstName = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.traget.value;
		if (val === '') {
			setFirstName({ val, ok: true });
			setErrorMessage('Enter a valid first name.');
		} else {
			setFirstName({ val, ok: false });
			setErrorMessage('');
		}
	};
	const validateLastName = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.traget.value;
		if (val === '') {
			setLastName({ val, ok: true });
			setErrorMessage('Enter a valid last name.');
		} else {
			setLastName({ val, ok: false });
			setErrorMessage('');
		}
	};
	const validateEmail = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.traget.value;
		const re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		if (re.test(val)) {
			setEmail({ val, ok: false });
			setErrorMessage('Enter a valid email address.');
		} else {
			setEmail({ val, ok: true });
			setErrorMessage('');
		}
	};
	const validatePassword = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.traget.value;
		if (val === '') {
			setPassword({ val, ok: true });
			setErrorMessage('Enter a valid password.');
		} else {
			setPassword({ val, ok: false });
			setErrorMessage('');
		}
	};

	return (
		<div>
			<form method='post' className={styles.form} onSubmit={submitSignupForm}>
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
						{errorMessage !== '' && (
							<p className={styles.error}>
								<img
									src={warningIcon}
									alt='warning icon'
									className={styles.warningIcon}
								/>
								{errorMessage}
							</p>
						)}
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
									className={firstName.ok ? styles.invalid : ''}
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
									className={lastName.ok ? styles.invalid : ''}
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
								className={email.ok ? styles.invalid : ''}
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
								className={password.ok ? styles.invalid : ''}
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
						<button type='button' onClick={() => setShowLoginPage(true)}>
							Log in
						</button>
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
