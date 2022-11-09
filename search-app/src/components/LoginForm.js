import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "../api/axios";
import Notification from "./ui/Notification";

import classes from "./LoginForm.module.css";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/api/login";

// Form for handling the login
function LoginForm() {
  const emailRef = useRef();
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loginRemarks, setLoginRemarks] = useState("");

  // When login page is loaded, focus is set on email using reference to emailInput element
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Whenever loginStatus becomes "error" (in case of any failure), make loginStatus and loginRemarks as ""
  // in order to make the error notification disappear after 5 seconds
  useEffect(() => {
    if (loginStatus === "error") {
      const timer = setTimeout(() => {
        setLoginStatus("");
        setLoginRemarks("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  // Handling login submit
  async function handleLogin(event) {
    event.preventDefault();

    setLoginStatus("pending");
    setLoginRemarks("Logging you in");

    try {
      // Send post request to backend server for logging in
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Get access token and set auth global context to contain email and access token so that it can be used all over the app
      const accessToken = response?.data?.accessToken;
      setAuth({ email, accessToken });

      // Clear input fields
      setEmail("");
      setPassword("");

      // Navigate to search page on successful login
      navigate("/search", { replace: true });
    } catch (error) {
      // Handling different login issues
      setLoginStatus("error");
      if (!error?.response) {
        setLoginRemarks("No server response !!!");
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 401
      ) {
        setLoginRemarks("Invalid Credentials !!!");
      } else {
        setLoginRemarks("Login failed !!!");
      }
    }
  }

  // Login form 
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={classes.control}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="off"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginRemarks !== "" && (
          <Notification type={loginStatus} message={loginRemarks} />
        )}
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <Link to="/signup">Not Registered? Create new account here</Link>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
