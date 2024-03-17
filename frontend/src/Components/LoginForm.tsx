import { useState } from 'react';
import { authUser } from 'util/api';
import { User } from 'types/user';
import { useNavigate } from 'react-router';

import googleIcon from '../images/googlelogo.svg';
import styles from './LoginForm.module.css';

interface LoginFormProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
	const navigate = useNavigate();
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidPassword, setInvalidPassword] = useState(false);

	const submitLoginForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		data.get('email') === '' ? setInvalidEmail(true) : setInvalidEmail(false);
		data.get('password') === ''
			? setInvalidPassword(true)
			: setInvalidPassword(false);
		if (invalidEmail === false && invalidPassword === false) {
			const formData: User | any = Object.fromEntries(data.entries());
			const res = await authUser('login', formData);
			// if (!res?.error) navigate('/settings');
		}
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
		<form method='post' className={styles.form} onSubmit={submitLoginForm}>
			<header>Log in</header>
			<button
				type='button'
				id={styles.lfboxClose}
				onClick={props.cancelHandler}
			></button>
			<div className={styles.form_content}>
				<section className={styles.lf_input_field}>
					<label htmlFor='email' />
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Email'
						className={invalidEmail ? styles.invalid : ''}
						onChange={validateEmail}
					/>
				</section>
				<section className={styles.lf_input_field}>
					<label htmlFor='password' />
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						className={invalidPassword ? styles.invalid : ''}
						onChange={validatePassword}
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
