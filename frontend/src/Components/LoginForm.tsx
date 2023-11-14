import { Form, Link } from "react-router-dom";
import classes from './LoginForm.module.css';

const LoginForm: React.FC = () => {
    return (
        <Form method="post" className={classes.form}>
            <h1>Log in</h1>
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </p>
            <div className={classes.actions}>
                <Link to='signup'>Sign up</Link>
                <button>Save</button>
            </div>
        </Form>
    );
};

export default LoginForm;
