import { ActionFunction, redirect } from "react-router-dom";

export const action: ActionFunction = async () => {
    const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resData = await response.json();
    // console.log(resData);
    return redirect('/elements');
};
