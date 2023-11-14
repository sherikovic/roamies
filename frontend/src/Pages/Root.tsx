import React from "react";
import { Outlet } from "react-router-dom";

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
