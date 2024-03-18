import { useEffect, useState } from 'react';
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
	const [firstName, setFirstName] = useState({ val: '', valid: false });
	const [lastName, setLastName] = useState({ val: '', valid: false });
	const [email, setEmail] = useState({ val: '', valid: false });
	const [password, setPassword] = useState({ val: '', valid: false });
	const [errorMessage, setErrorMessage] = useState('');

	const validateInputsForSubmit = () => {
		if (password.val === '') {
			setPassword((prev) => ({ ...prev, valid: false }));
			setErrorMessage('Please enter valid password.');
		} else {
			setPassword((prev) => ({ ...prev, valid: true }));
		}
		if (
			email.val === '' ||
			!/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.val)
		) {
			setEmail((prev) => ({ ...prev, valid: false }));
			setErrorMessage('Please enter valid email address.');
		} else {
			setEmail((prev) => ({ ...prev, valid: true }));
		}
		if (lastName.val === '') {
			setLastName((prev) => ({ ...prev, valid: false }));
			setErrorMessage('Please enter valid last name.');
		} else {
			setLastName((prev) => ({ ...prev, valid: true }));
		}
		if (firstName.val === '') {
			setFirstName((prev) => ({ ...prev, valid: false }));
			setErrorMessage('Please enter valid first name.');
		} else {
			setFirstName((prev) => ({ ...prev, valid: true }));
		}
	};

	const sendAuthRequest = async (data: any) => {
		if (firstName.valid && lastName.valid && email.valid && password.valid) {
			setErrorMessage('');
			const formData: User | any = Object.fromEntries(data.entries());
			const res = await authUser('signup', formData);
			if (res.status === 201) {
				navigate('/trips');
			} else {
				console.log(res.getJson);
				// setErrorMessage('ssss');
			}
		}
	};

	const submitSignupForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		validateInputsForSubmit();
		sendAuthRequest(data);
	};

	const validateFirstName = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.target.value;
		setFirstName({ val, valid: false });
	};
	const validateLastName = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.target.value;
		setLastName({ val, valid: false });
	};
	const validateEmail = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.target.value;
		if (/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(val) || val === '') {
			setEmail({ val, valid: false });
		} else {
			setEmail({ val, valid: true });
		}
	};
	const validatePassword = (e: string | any) => {
		const val = typeof e === 'string' ? e : e.target.value;
		setPassword({ val, valid: false });
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
									className={!firstName.valid ? styles.invalid : ''}
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
									className={!lastName.valid ? styles.invalid : ''}
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
								className={!email.valid ? styles.invalid : ''}
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
								className={!password.valid ? styles.invalid : ''}
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
