import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
    const data: any = useRouteLoaderData('root');
    console.log(data.user)

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
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to={data.user ? '/auth/logout' : '/auth?mode=login'}
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            {data.user ? 'Logout' : 'Login'}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;