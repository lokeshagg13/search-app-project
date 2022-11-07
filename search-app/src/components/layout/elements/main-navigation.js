import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthProvider";
import LoginIcon from "../../ui/icons/LoginIcon";
import LogoutIcon from "../../ui/icons/LogoutIcon";
import SignupIcon from "../../ui/icons/SignupIcon";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logoutHandler() {
    setAuth({});
    navigate("/", { replace: true });
  }

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
