import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
    const data: any = useRouteLoaderData('root');

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/elements'
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Elements
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <nav>
                <div className={classes.dropdown}>
                    <img
                        src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                        alt="user's profile"
                    />
                    {(!data || !data.user) &&
                        <div className={classes.dropdown_content}>
                            <li>
                                <NavLink
                                    to='/auth?mode=login'
                                    className={({ isActive }) => isActive ? classes.active : undefined}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </div>
                    }
                    {data && data.user &&
                        <div className={classes.dropdown_content}>
                            <li>
                                <NavLink
                                    to='/profile'
                                    className={({ isActive }) => isActive ? classes.active : undefined}
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <Form action="/logout" method="post">
                                    <button className={classes.button}>Logout</button>
                                </Form>
                            </li>
                        </div>
                    }
                </div>
                {/* <ul className={classes.list}>
                    {(!data || !data.user) &&
                        < li >
                            <NavLink
                                to='/auth?mode=login'
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    }
                    {data && data.user &&
                        <li>
                            <Form action="/logout" method="post">
                                <button className={classes.button}>Logout</button>
                            </Form>
                        </li>
                    }
                </ul> */}
            </nav>
        </header >
    );
};

export default MainNavigation;
