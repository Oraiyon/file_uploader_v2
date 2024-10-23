import { useRef, useState } from "react";
import styles from "../stylesheets/SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const submitSignUp = async (e) => {
    try {
      e.preventDefault();
      validateUsername();
      validatePassword();
      validateConfirmPassword();
      if (
        !invalidUsername &&
        !invalidPassword &&
        !invalidConfirmPassword &&
        usernameRef.current.value &&
        passwordRef.current.value &&
        confirmPasswordRef.current.value
      ) {
        const fetchSignUp = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
          })
        });
        const data = await fetchSignUp.json();
        if (!data) {
          setUsernameTaken(true);
        } else {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateUsername = () => {
    if (!usernameRef || usernameRef.current.value.length < 3) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  };

  const validatePassword = () => {
    if (!passwordRef || passwordRef.current.value.length < 6) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPasswordRef || confirmPasswordRef.current.value !== passwordRef.current.value) {
      setInvalidConfirmPassword(true);
    } else {
      setInvalidConfirmPassword(false);
    }
  };

  return (
    <>
      <form action="" onSubmit={submitSignUp} className={styles.signUpForm}>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" ref={usernameRef} />
          {invalidUsername ? (
            <p className={styles.invalidInput}>Username must be atleast 3 characters long.</p>
          ) : (
            ""
          )}
          {usernameTaken ? <p className={styles.invalidInput}>Username is already taken.</p> : ""}
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" ref={passwordRef} />
          {invalidPassword ? (
            <p className={styles.invalidInput}>Password must be atleast 6 characters long.</p>
          ) : (
            ""
          )}
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
          {invalidConfirmPassword ? (
            <p className={styles.invalidInput}>Confirm Password must match Password.</p>
          ) : (
            ""
          )}
          <button>Sign Up</button>
          <p>
            Already have an account? <Link to={"/login"}>Log In!</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
