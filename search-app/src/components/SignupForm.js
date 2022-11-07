import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../api/axios";
import Notification from "./ui/Notification";

import classes from "./SignupForm.module.css";

const REGISTER_URL = "/api/register";

function SignupForm() {
  const nameRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [signupRemarks, setSignupRemarks] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    if (
      signupStatus === "error" &&
      !signupRemarks.includes("Passwords do not match")
    ) {
      const timer = setTimeout(() => {
        setSignupStatus("");
        setSignupRemarks("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupStatus, signupRemarks]);

  useEffect(() => {
    if (signupStatus === "success") return;
    if (password.trim() === "" || passwordConfirm.trim === "") {
      setSignupStatus("");
      setSignupRemarks("");
      return;
    }
    if (password === passwordConfirm) {
      setSignupStatus("");
      setSignupRemarks("");
    } else {
      setSignupStatus("error");
      setSignupRemarks("Passwords do not match!");
    }
  }, [signupStatus, password, passwordConfirm]);

  async function handleSignup(event) {
    event.preventDefault();

    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(email) === false
    ) {
      setSignupStatus("error");
      setSignupRemarks("Invalid email");
      return;
    }

    setSignupStatus("pending");
    setSignupRemarks("Registering your details...");
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSignupStatus("success");
      setSignupRemarks("Registration successful ");

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      setSignupStatus("error");
      if (!error?.response) {
        setSignupRemarks("No server response !!!");
      } else if (error.response?.status === 409) {
        setSignupRemarks("Email is already registered with us !!!");
      } else {
        setSignupRemarks("Registration failed !!!");
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            autoComplete="off"
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="off"
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
        <div className={classes.control}>
          <label htmlFor="password2">Reenter Password</label>
          <input
            type="password"
            id="password2"
            value={passwordConfirm}
            autoComplete="off"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        {signupRemarks && (
          <Notification type={signupStatus} message={signupRemarks} />
        )}
        <div className={classes.actions}>
          <button>Create Account</button>
          <Link to="/login">Already Registered? Login here</Link>
        </div>
      </form>
    </section>
  );
}

export default SignupForm;
