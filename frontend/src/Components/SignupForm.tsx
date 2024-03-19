import { useState } from 'react';
import { authUser } from 'util/api';
import { User } from 'types/user';
import { useLocation, useNavigate } from 'react-router';

import googleIcon from '../images/googlelogo.svg';
import emailIcon from '../images/emailicon.png';
import passwordIcon from '../images/passwordicon.png';
import personalIcon from '../images/personalicon.png';
import warningIcon from '../images/warningicon.png';

import styles from './SignupForm.module.css';
import LoginForm from './LoginForm';

const fields = {
	password: {
		val: '',
		valid: true,
		errorMessage: 'Please enter valid password.',
	},
	email: {
		val: '',
		valid: true,
		errorMessage: 'Please enter valid email address.',
	},
	lastName: {
		val: '',
		valid: true,
		errorMessage: 'Please enter valid last name.',
	},
	firstName: {
		val: '',
		valid: true,
		errorMessage: 'Please enter valid first name.',
	},
};

const SignupForm: React.FC = () => {
	const navigate = useNavigate();

	const [formInputs, setFormInputs] = useState(fields);
	const [showLoginPage, setShowLoginPage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const validateInputsForSubmit = () => {
		let isInvalid = false;
		Object.keys(formInputs).forEach((key: any) => {
			const input = formInputs[key];
			if (
				input.val === '' ||
				(key === 'email' &&
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
		// setState is asyncronous, so you need the function to return the value of isInvalid, can't rely on state for that
		return isInvalid;
	};

	const sendAuthRequest = async (data: any) => {
		const formData: User | any = Object.fromEntries(data.entries());
		const res = await authUser('signup', formData);
		res.status === 201 ? navigate(-1) : setErrorMessage(res.getJson.message);
	};

	const submitSignupForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const isInvalid = validateInputsForSubmit();
		!isInvalid && sendAuthRequest(data);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type: 'firstName' | 'lastName' | 'email' | 'password';
		value: string;
	}) => {
		setFormInputs({
			...formInputs,
			[type]: {
				...formInputs[type],
				val: value,
				valid:
					type === 'email'
						? /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) ||
						  value === ''
							? true
							: false
						: true,
			},
		});
		setErrorMessage('');
	};

	return (
		<div>
			<form method='post' className={styles.form} onSubmit={submitSignupForm}>
				<div className={styles.form_content}>
					<section className={styles.email_login}>
						<header>Create new account</header>
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
										className={`${styles.icon} ${styles.flicon}`}
									/>
								</label>
								<input
									type='firstname'
									name='firstname'
									id='firstname'
									placeholder='First Name'
									className={
										formInputs['firstName'].valid ? '' : styles.invalid
									}
									onChange={(e) =>
										inputOnChange({ type: 'firstName', value: e.target.value })
									}
								/>
							</div>
							<div className={styles.su_input_field}>
								<label htmlFor='lastname'>
									<img
										src={personalIcon}
										alt='personal icon'
										className={`${styles.icon} ${styles.flicon}`}
									/>
								</label>
								<input
									type='lastname'
									name='lastname'
									id='lastname'
									placeholder='Last Name'
									className={formInputs['lastName'].valid ? '' : styles.invalid}
									onChange={(e) =>
										inputOnChange({ type: 'lastName', value: e.target.value })
									}
								/>
							</div>
						</div>
						<div className={styles.su_input_field}>
							<label htmlFor='email'>
								<img
									src={emailIcon}
									alt='email icon'
									className={`${styles.icon} ${styles.epicon}`}
								/>
							</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								className={formInputs['email'].valid ? '' : styles.invalid}
								onChange={(e) =>
									inputOnChange({ type: 'email', value: e.target.value })
								}
							/>
						</div>
						<div className={styles.su_input_field}>
							<label htmlFor='password'>
								<img
									src={passwordIcon}
									alt='password icon'
									className={`${styles.icon} ${styles.epicon}`}
								/>
							</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='Password'
								className={formInputs['password'].valid ? '' : styles.invalid}
								onChange={(e) =>
									inputOnChange({ type: 'password', value: e.target.value })
								}
							/>
						</div>
						<div>
							<button name='signup' type='submit'>
								Sign up
							</button>
						</div>
					</section>
					<section className={styles.separator}>
						<span>or</span>
					</section>
					<section className={styles.other_login}>
						<button name='google' type='button'>
							<img
								src={googleIcon}
								alt='Google logo'
								className={styles.googlelogo}
							/>
							<p>Google</p>
						</button>
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
