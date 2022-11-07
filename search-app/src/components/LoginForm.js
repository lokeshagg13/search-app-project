import { useEffect, useRef, useState, useContext } from "react";

import axios from "../api/axios";
import Notification from "./ui/Notification";
import AuthContext from "../context/AuthProvider";

import classes from "./LoginForm.module.css";

const LOGIN_URL = "/api/login";

function LoginForm() {
  const emailRef = useRef();
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loginRemarks, setLoginRemarks] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (loginStatus === "error") {
      const timer = setTimeout(() => {
        setLoginStatus("");
        setLoginRemarks("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  async function handleLogin(event) {
    event.preventDefault();

    setLoginStatus("pending");
    setLoginRemarks("Logging you in");
    try {
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

      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setLoginStatus("success");
      setLoginRemarks("Login Successful");

      // Clear input fields
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoginStatus("error");
      if (!error?.response) {
        setLoginRemarks("No server response !!!");
      } else if (error.response?.status === 400 || error.response?.status === 401) {
        setLoginRemarks("Invalid Credentials !!!");
      } else {
        setLoginRemarks("Login failed !!!");
      }
    }
  }

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
          {/* <Link href="/signup">Not Registered? Create new account here</Link> */}
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
