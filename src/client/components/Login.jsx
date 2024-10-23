import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Login.module.css";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";

const Login = () => {
  const [user, setUser] = useOutletContext();

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [revealPasswordIcon, setRevealPasswordIcon] = useState(mdiEye);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const redirectRef = useRef(null);

  useEffect(() => {
    if (user) {
      redirectRef.current.click();
    }
  }, [user]);

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      validateUsername();
      validatePassword();
      if (
        !invalidUsername &&
        !invalidPassword &&
        usernameRef.current.value &&
        passwordRef.current.value
      ) {
        const fetchUser = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value
          })
        });
        const data = await fetchUser.json();
        if (!data) {
          setInvalidUsername(true);
          setInvalidPassword(true);
        } else {
          setUser(data);
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

  const revealPassword = (e) => {
    e.preventDefault();
    if (passwordRef.current.type === "password") {
      setRevealPasswordIcon(mdiEyeOff);
      passwordRef.current.type = "text";
    } else {
      setRevealPasswordIcon(mdiEye);
      passwordRef.current.type = "password";
    }
  };

  return (
    <>
      <form action="" onSubmit={submitLogin} className={styles.loginForm}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" ref={usernameRef} />
          <label htmlFor="password">Password:</label>
          <div>
            <input type="password" name="password" id="password" ref={passwordRef} />
            <button onClick={revealPassword}>
              <Icon path={revealPasswordIcon}></Icon>
            </button>
          </div>
          {invalidUsername || invalidPassword ? (
            <p className={styles.invalidInput}>Invalid Username or Password.</p>
          ) : (
            ""
          )}
          <button>Login</button>
          <p>
            Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
          </p>
        </div>
      </form>
      {user ? <Link to={`/${user.id}`} ref={redirectRef} style={{ display: "none" }}></Link> : ""}
    </>
  );
};

export default Login;
