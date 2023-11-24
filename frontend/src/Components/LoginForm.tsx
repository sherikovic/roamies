import { Form, Link, useActionData, useSearchParams } from "react-router-dom";
import classes from './LoginForm.module.css';

const LoginForm: React.FC = () => {
    const data: any = useActionData();
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? 'Log in' : 'Sign up'}</h1>
                {data && data === "username exists" &&
                    <p style={{ color: "orange" }}>User with the same username already exists!</p>
                }
                {data && data === "email exists" &&
                    <p style={{ color: "orange" }}>User with the same email already exists!</p>
                }
                {data && data === "Unauthorized" &&
                    <p style={{ color: "orange" }}>Either username or password is incorrect!</p>
                }
                {data && data === "Username is empty" &&
                    <p style={{ color: "orange" }}>Username cannot be empty!</p>
                }
                {data && data === "Email is empty" &&
                    <p style={{ color: "orange" }}>Email cannot be empty!</p>
                }
                {data && data === "Password is empty" &&
                    <p style={{ color: "orange" }}>Password cannot be empty!</p>
                }
                {!isLogin ?
                    <p>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" />
                    </p> : ''
                }
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </p>
                <div className={classes.actions}>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Sign up' : 'Log in'}</Link>
                    <button>Submit</button>
                </div>
            </Form>
        </>
    );
};

export default LoginForm;
