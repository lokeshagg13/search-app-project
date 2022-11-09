import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import useAuth from "../../../hooks/useAuth";
import LoginIcon from "../../ui/icons/LoginIcon";
import LogoutIcon from "../../ui/icons/LogoutIcon";
import SignupIcon from "../../ui/icons/SignupIcon";

import classes from "./main-navigation.module.css";

const LOGOUR_URL = "/api/logout";

// Navigation Bar
function MainNavigation() {
  // Check auth and display different elements in nav bar based on whether user is logged in or not
  const { auth, setAuth } = useAuth();
  // Private server handle for protected logout route
  const axiosPrivate = useAxiosPrivate();
  // Navigate hook to manually navigate to different pages
  const navigate = useNavigate();

  // Function to handle logout
  async function logoutHandler() {
    try {
      // Get request to backend server for logout
      await axiosPrivate.get(LOGOUR_URL);
      // Reset the auth on logout
      setAuth({});
      // Navigate back to home
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  }

  // If authorized, then show only logout button on navbar otherwise show login and signup button
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="SEARCH ICON"
            style={{ width: "100px" }}
          />
        </Link>
      </div>
      <nav>
        <ul>
          {(!auth?.email || !auth?.accessToken) && (
            <Fragment>
              <li>
                <Link to="/login">
                  <div className={classes.linkIcon}>
                    <LoginIcon />
                  </div>
                  <div className={classes.linkText}>Login</div>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <div className={classes.linkIcon}>
                    <SignupIcon />
                  </div>
                  <div className={classes.linkText}>Signup</div>
                </Link>
              </li>
            </Fragment>
          )}

          {auth?.email && auth?.accessToken && (
            <Fragment>
              <li>
                <button onClick={logoutHandler}>
                  <div className={classes.linkIcon}>
                    <LogoutIcon />
                  </div>
                  <div className={classes.linkText}>Logout</div>
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
