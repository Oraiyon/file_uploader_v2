import { useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/File.module.css";
import Navbar from "./Navbar";
import DisplayFileSize from "./DisplayFileSize";
import Icon from "@mdi/react";
import { mdiDownload, mdiClose } from "@mdi/js";

const File = () => {
  const [
    user,
    setUser,
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
    selectedFile,
    setSelectedFile,
    files,
    setFiles
  ] = useOutletContext();

  const downloadLinkRef = useRef(null);
  const redirectLinkRef = useRef(null);

  if (!user) {
    window.location.href = "/";
    return;
  }

  const downloadFile = () => {
    const start = selectedFile.url.substr(0, 50);
    const end = selectedFile.url.slice(49);
    const url = selectedFile + `fl_attachment:${selectedFile.name}` + end;
    downloadLinkRef.current.href = url;
    downloadLinkRef.current.click();
  };

  const deleteFile = async () => {
    const response = await fetch(`/api/${user.id}/${selectedFolder.id}/delete/${selectedFile.id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    setFiles(data);
    redirectLinkRef.current.click();
  };

  return (
    <>
      <Navbar level={3} user={user} selectedFolder={selectedFolder} selectedFile={selectedFile} />
      <div className={styles.fileContainer}>
        <div>
          <div className={styles.file_buttons}>
            <button>
              <Icon path={mdiDownload} title="Download" onClick={downloadFile}></Icon>
            </button>
            <h3>
              {selectedFile.name}.{selectedFile.format}
            </h3>
            <button>
              <Icon path={mdiClose} title="Delete" onClick={deleteFile}></Icon>
            </button>
            <a ref={downloadLinkRef} href=""></a>
            <Link to={`/${user.id}/${selectedFolder.id}`} ref={redirectLinkRef}></Link>
          </div>
          <img src={selectedFile.url} alt={selectedFile.name} />
          <DisplayFileSize file={selectedFile} />
        </div>
      </div>
    </>
  );
};

export default File;
