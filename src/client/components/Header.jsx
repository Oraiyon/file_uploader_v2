import { Link } from "react-router-dom";
import styles from "../stylesheets/Header.module.css";

const Header = (props) => {
  return (
    <>
      <nav className={styles.header}>
        <h1>
          <Link to={props.user ? `/${props.user.id}` : "/"}>Home</Link>
        </h1>
        {props.user ? (
          <div className={styles.right_header_links}>
            <button>
              <Link to={`/${props.user.id}/upload`}>Upload File</Link>
            </button>
            <button>
              <a href="/logout">Log Out</a>
            </button>
          </div>
        ) : (
          <div className={styles.right_header_links}>
            <button>
              <Link to={"/signup"}>Sign Up</Link>
            </button>
            <button>
              <Link to={"/login"}>Log In</Link>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
