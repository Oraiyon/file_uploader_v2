import styles from "../stylesheets/FolderList.module.css";
import Icon from "@mdi/react";
import { mdiFolder, mdiClose, mdiShareVariant } from "@mdi/js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import ShareFolderModal from "./ShareFolderModal";

const Folders = (props) => {
  const [displayDeleteFolderModal, setDisplayDeleteFolderModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [folderToBeDeleted, setFolderToBeDeleted] = useState(null);
  const [displayShareFolderModal, setDisplayShareFolderModal] = useState(false);
  const [folderToBeShared, setFolderTobeShared] = useState(null);

  const deleteFolderModal = useRef(null);

  const DisplayFolderHeader = (props) => {
    if (!modalMessage) {
      return (
        <div className={styles.folderButtons}>
          <button onClick={() => shareFolderButton(props.folder)}>
            <Icon path={mdiShareVariant}></Icon>
          </button>
          <p>{props.folder.name}</p>
          <button onClick={() => deleteFolderButton(props.folder)}>
            <Icon path={mdiClose} title={"Delete"}></Icon>
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.folderButtons}>
          <button>
            <Icon path={mdiShareVariant}></Icon>
          </button>
          <p>{props.folder.name}</p>
          <button>
            <Icon path={mdiClose}></Icon>
          </button>
        </div>
      );
    }
  };

  const deleteFolderButton = async (folder) => {
    try {
      const response = await fetch(`/api/${props.user.id}/delete/${folder.id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.filesLength) {
        setDisplayDeleteFolderModal(true);
        setModalMessage(
          `${folder.name} has ${data.filesLength} ${data.filesLength === 1 ? "file" : "files"} inside. Are you sure you want to delete ${folder.name}?`
        );
        setFolderToBeDeleted(folder);
      } else {
        props.setFolderList(data);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFolderWithFiles = async () => {
    try {
      const response = await fetch(`/api/${props.user.id}/delete/${folderToBeDeleted.id}/files`, {
        method: "DELETE"
      });
      const data = await response.json();
      props.setFolderList(data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayDeleteFolderModal = (props) => {
    if (props.displayDeleteFolderModal) {
      return (
        <div className={styles.deleteFolderModal} ref={deleteFolderModal}>
          <button onClick={closeModal}>
            <Icon path={mdiClose}></Icon>
          </button>
          <p>{modalMessage}</p>
          <button onClick={deleteFolderWithFiles}>DELETE FOLDER</button>
        </div>
      );
    }
  };

  const shareFolderButton = async (folder) => {
    try {
      setDisplayShareFolderModal(true);
      setFolderTobeShared(folder);
      setModalMessage("Share");
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = (func) => {
    setDisplayDeleteFolderModal(false);
    setModalMessage("");
    setDisplayShareFolderModal(false);
    func("");
  };

  if (!props.folderList.length) {
    return <p>No folders.</p>;
  } else {
    return (
      <>
        <Navbar level={1} user={props.user} />
        <div className={styles.folderContainer}>
          {props.folderList.map((folder) =>
            !modalMessage ? (
              <div key={folder.id} className={styles.folderCard}>
                <DisplayFolderHeader folder={folder} />
                <Link to={`/${props.user.id}/folder/${folder.id}`}>
                  <div className={styles.folder} onClick={() => props.setSelectedFolder(folder)}>
                    <Icon path={mdiFolder} className={styles.folderIcon}></Icon>
                  </div>
                </Link>
              </div>
            ) : (
              <div key={folder.id} className={styles.invalidFolderCard}>
                <DisplayFolderHeader folder={folder} />
                <div className={styles.folder}>
                  <Icon path={mdiFolder} className={styles.folderIcon}></Icon>
                </div>
              </div>
            )
          )}
          <DisplayDeleteFolderModal displayDeleteFolderModal={displayDeleteFolderModal} />
          <ShareFolderModal
            user={props.user}
            displayShareFolderModal={displayShareFolderModal}
            folderToBeShared={folderToBeShared}
            closeModal={closeModal}
          />
        </div>
      </>
    );
  }
};

export default Folders;
