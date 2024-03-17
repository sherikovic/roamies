import SignupForm from 'Components/SignupForm';
import styles from './Signup.module.css';

const SignupPage: React.FC = () => {
	return (
		<div className={styles.register_page}>
			<div className={styles.register_layout}>
				<div className={styles.left_side}></div>
				<div className={styles.right_side}>
					<SignupForm />
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
