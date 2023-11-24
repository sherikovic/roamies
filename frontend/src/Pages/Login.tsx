import { ActionFunction, json, redirect, useRouteLoaderData } from "react-router-dom";
import LoginForm from "../Components/LoginForm";

const LoginPage: React.FC = () => {
    const data: any = useRouteLoaderData('root');

    return (
        <>
            {data && !data.user && <LoginForm />}
            {data && data.user &&
                <div>
                    <h4 style={{ textAlign: 'center' }}>You are already logged in!</h4>
                </div>
            }
        </>
    );
};

export default LoginPage;

export const action: ActionFunction = async ({ request }) => {
    const mode = new URL(request.url).searchParams.get('mode');
    const data = await request.formData();

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode' }, { status: 422 });
    };

    if (mode === 'signup' && data.get('username') === "") {
        return 'Username is empty'
    }
    if (data.get('email') === "") {
        return 'Email is empty'
    }
    if (data.get('password') === "") {
        return 'Password is empty'
    }

    let authData: any = {
        email: data.get('email'),
        password: data.get('password')
    };

    if (mode === 'signup') {
        authData.username = data.get('username');
    };

    const response = await fetch('http://localhost:8080/auth/' + mode, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 401) { // user exists
        return response;
    } else if (response.status === 300) { // user is already logged in
        return redirect('/elements');
    }
    else if (!response.ok) {
        throw json({ message: 'An error occured!' }, { status: 500 });
    } else {
        return redirect('/elements');
    }
};
