import { Link } from "react-router-dom";
import styles from "../stylesheets/Navbar.module.css";

const Navbar = (props) => {
  if (props.user) {
    if (props.level === 1) {
      return (
        <nav className={styles.navContainer}>
          <Link to={`/${props.user.id}`}>Folder List</Link>
        </nav>
      );
    } else if (props.level === 2) {
      return (
        <nav className={styles.navContainer}>
          <Link to={`/${props.user.id}`}>Folder List</Link>
          <Link to={`/${props.user.id}/folder/${props.selectedFolder.id}`}>
            {props.selectedFolder.name}
          </Link>
        </nav>
      );
    } else if (props.level === 3) {
      return (
        <nav className={styles.navContainer}>
          <Link to={`/${props.user.id}`}>Folder List</Link>
          <Link to={`/${props.user.id}/folder/${props.selectedFolder.id}`}>
            {props.selectedFolder.name}
          </Link>
          <Link
            to={`/${props.user.id}/folder/${props.selectedFolder.id}/file/${props.selectedFile.id}`}
          >
            {props.selectedFile.name}.{props.selectedFile.format}
          </Link>
        </nav>
      );
    }
  } else {
    if (props.level === 2) {
      return (
        <nav className={styles.navContainer}>
          <Link to={`/folder/${props.selectedFolder.id}/share`}>{props.selectedFolder.name}</Link>
        </nav>
      );
    } else if (props.level === 3) {
      return (
        <nav className={styles.navContainer}>
          <Link to={`/folder/${props.selectedFolder.id}/share`}>{props.selectedFolder.name}</Link>
          <Link to={`/folder/${props.selectedFolder.id}/file/${props.selectedFile.id}/share`}>
            {props.selectedFile.name}.{props.selectedFile.format}
          </Link>
        </nav>
      );
    }
  }
};

export default Navbar;
