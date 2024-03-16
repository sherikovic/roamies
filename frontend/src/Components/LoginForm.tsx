import { Form, useActionData } from 'react-router-dom';
import styles from './LoginForm.module.css';
import images from '../images/google.686f8efa.svg';
interface LoginFormProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
	const data: any = useActionData();

	return (
		<Form method='post' className={styles.form}>
			<header>Log in</header>
			<button id={styles.lfboxClose} onClick={props.cancelHandler}></button>

			{data && data === 'username exists' && (
				<p style={{ color: 'orange' }}>
					User with the same username already exists!
				</p>
			)}
			{data && data === 'email exists' && (
				<p style={{ color: 'orange' }}>
					User with the same email already exists!
				</p>
			)}
			{data && data === 'Unauthorized' && (
				<p style={{ color: 'orange' }}>
					Either username or password is incorrect!
				</p>
			)}
			{data && data === 'Username is empty' && (
				<p style={{ color: 'orange' }}>Username cannot be empty!</p>
			)}
			{data && data === 'Email is empty' && (
				<p style={{ color: 'orange' }}>Email cannot be empty!</p>
			)}
			{data && data === 'Password is empty' && (
				<p style={{ color: 'orange' }}>Password cannot be empty!</p>
			)}

			<div className={styles.form_content}>
				<section className={styles.lf_input_field}>
					<label htmlFor='email' />
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Email or Username'
					/>
				</section>
				<section className={styles.lf_input_field}>
					<label htmlFor='password' />
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
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
					<button name='login'>Log in</button>
					<span>OR</span>
					<button name='google'>
						<img
							src='/static/media/google.686f8efa.svg'
							alt='Google logo'
							className={styles.googlelogo}
						/>
						<p>Continue with Google</p>
					</button>
					<div>
						<span>Not a member yet?</span>
						<button name='join'>Join</button>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default LoginForm;
