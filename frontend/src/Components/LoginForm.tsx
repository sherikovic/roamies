import { useState } from 'react';
import { authUser } from 'util/api';
import { User } from 'types/user';
import { useLocation, useNavigate } from 'react-router';

import googleIcon from '../images/googlelogo.svg';
import warningIcon from '../images/warningicon.png';
import styles from './LoginForm.module.css';

interface LoginFormProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

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
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
	const navigate = useNavigate();
	let location = useLocation().pathname;

	const [formInputs, setFormInputs] = useState(fields);
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
		const res = await authUser('login', formData);
		if (res.status === 201) {
			location.includes('signup') ? navigate(-1) : window.location.reload();
		}
		res.status === 300 && setErrorMessage('A user is already logged in!');
		res.status === 401 &&
			setErrorMessage('Either email or password is invalid!');
	};

	const submitLoginForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const isInvalid = validateInputsForSubmit();
		!isInvalid && sendAuthRequest(data);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type: 'email' | 'password';
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
		<form method='post' className={styles.form} onSubmit={submitLoginForm}>
			<header>Log in</header>
			<button
				type='button'
				id={styles.lfboxClose}
				onClick={props.cancelHandler}
			/>
			<div className={styles.form_content}>
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
				<section className={styles.lf_input_field}>
					<label htmlFor='email' />
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
				</section>
				<section className={styles.lf_input_field}>
					<label htmlFor='password' />
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
				</section>
				<section className={styles.login_options}>
					<div className={styles.checkbox_container}>
						<input type='checkbox' name='remember_me' id='remember_me' />
						<span className={styles.checkmark}></span>
						<label htmlFor='remember_me'>Remember me</label>
					</div>
					<div>
						<a href='/'>Forgot password?</a>
					</div>
				</section>
				<div className={styles.actions}>
					<button name='login' type='submit'>
						Log in
					</button>
					<span>or</span>
					<button name='google' type='button'>
						<img
							src={googleIcon}
							alt='Google logo'
							className={styles.googlelogo}
						/>
						<p>Continue with Google</p>
					</button>
					<div>
						<span>Not a member yet?</span>
						<a href='signup'>Join</a>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
