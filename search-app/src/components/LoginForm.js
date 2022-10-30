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
        })
      );
    } catch (error) {}
    setTimeout(() => {
      setLoginStatus("success");
      setLoginRemarks("Login Successful");
    }, 3000);
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
          {/* <Link href="/signup">Create new account</Link> */}
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
