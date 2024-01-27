import { Form, NavLink, Link, useRouteLoaderData } from "react-router-dom";
import { useRef, useState } from "react";

import classes from "./MainNavigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { useOutsideAlerter } from "../utils";

const MainNavigation: React.FC = () => {
  const data: any = useRouteLoaderData("root");
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const containerRef = useRef(null);

  useOutsideAlerter(containerRef, () => {
    setToggleDisplay(false);
  });

  function dropdownContentToggleHandler(event: any): void {
    setToggleDisplay(!toggleDisplay);
  }

  return (
    <header className={classes.header}>
      <nav className={classes.list}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${classes.listitem} ${classes.listitem_active}`
              : classes.listitem
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/elements"
          className={({ isActive }) =>
            isActive
              ? `${classes.listitem} ${classes.listitem_active}`
              : classes.listitem
          }
        >
          Elements
        </NavLink>
      </nav>
      <nav ref={containerRef} className={classes.dropdown}>
        <div
          className={classes.dd_user_menu}
          onClick={dropdownContentToggleHandler}
        >
          <img
            src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            alt="user's profile"
            onClick={dropdownContentToggleHandler}
          />
          {data && data.user && (
            <i className={classes.dd_userheader}>Hello, {data.user}</i>
          )}
          <div
            className={`${classes.dd_caret_down} ${
              toggleDisplay && classes.dd_caret_down_tr
            }`}
          >
            <FontAwesomeIcon
              icon={faCaretSquareDown}
              className={classes.dd_caret_down_svg}
            />
          </div>
        </div>
        {(!data || !data.user) && (
          <div
            className={`${classes.dd_content} ${
              toggleDisplay && classes.dd_content_display
            }`}
          >
            <Link
              to="/auth?mode=login"
              onClick={dropdownContentToggleHandler}
              className={classes.dd_content_item}
            >
              Login
            </Link>
          </div>
        )}
        {data && data.user && (
          <div
            className={`${classes.dd_content} ${
              toggleDisplay && classes.dd_content_display
            }`}
          >
            <NavLink
              to="/profile"
              onClick={dropdownContentToggleHandler}
              className={({ isActive }) =>
                isActive
                  ? `${classes.dd_content_item} ${classes.usermenu_active}`
                  : classes.dd_content_item
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/settings"
              onClick={dropdownContentToggleHandler}
              className={({ isActive }) =>
                isActive
                  ? `${classes.dd_content_item} ${classes.usermenu_active}`
                  : classes.dd_content_item
              }
            >
              Settings
            </NavLink>
            <Form action="/logout" method="post">
              <button
                onClick={dropdownContentToggleHandler}
                className={`${classes.dd_content_item} ${classes.dd_content_button}`}
              >
                Logout
              </button>
            </Form>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
