import React from "react";
import { LoaderFunction, Outlet, json } from "react-router-dom";

import MainNavigation from "../Components/MainNavigation";

const RootLayout: React.FC = () => {
    return (
        <React.Fragment>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default RootLayout;

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await fetch('http://localhost:8080/auth/getuser', {
        credentials: 'include'
    });

    if (response.ok) {
        return response;
    } else {
        throw json({ message: 'An error occured!' }, { status: 500 });
    }
}