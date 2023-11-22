import { ActionFunction, json, redirect } from "react-router-dom";
import LoginForm from "../Components/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <LoginForm />
    );
};

export default LoginPage;

export const action: ActionFunction = async ({ request }) => {
    const mode = new URL(request.url).searchParams.get('mode');
    const data = await request.formData();

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode' }, { status: 422 });
    };

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

    if (response.status !== 401) {
        const resData = await response.json();
        console.log(resData.message);
    }

    if (response.status === 401) { // user exists
        return response;
    } else if (response.status === 300) { // user is already logged in
        return redirect('/elements');
    }
    else if (!response.ok) {
        throw json({ message: 'An error occured!' }, { status: 500 });
    } else {
        return redirect('/');
    }
};
