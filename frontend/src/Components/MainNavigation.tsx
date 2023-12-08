import { Form, NavLink, Link, useRouteLoaderData } from "react-router-dom";

import classes from './MainNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons'

const MainNavigation: React.FC = () => {
    const data: any = useRouteLoaderData('root');

    function dropdownContentToggleHandler(event: any): void {
        document.getElementById("dropdown_content")!.classList.toggle(classes.dd_content_display);
    }

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
                        onClick={dropdownContentToggleHandler}
                    />
                    <Link
                        to="#"
                        className={classes.dd_caret_down}
                        role="button"
                        onClick={dropdownContentToggleHandler}
                        title="User menu"
                    >
                        {data && data.user &&
                            <i className={classes.dd_userheader}>Hello, {data.user}</i>
                        }
                        <FontAwesomeIcon icon={faCaretSquareDown} />
                    </Link>
                    {(!data || !data.user) &&
                        <div className={classes.dd_content} id="dropdown_content">
                            <Link to='/auth?mode=login' onClick={dropdownContentToggleHandler}>Login</Link>
                        </div>
                    }
                    {data && data.user &&
                        <div className={classes.dd_content} id="dropdown_content">
                            <Link to='/profile' onClick={dropdownContentToggleHandler}>Profile</Link>
                            <Link to='/settings' onClick={dropdownContentToggleHandler}>Settings</Link>
                            <Form action="/logout" method="post">
                                <button onClick={dropdownContentToggleHandler}>Logout</button>
                            </Form>
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
