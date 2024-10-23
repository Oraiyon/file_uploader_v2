import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../stylesheets/UnauthorizedFolder.module.css";
import Navbar from "./Navbar";
import DisplayFileSize from "./DisplayFileSize";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";

const UnauthorizedFolder = () => {
  const [link, setLink] = useState(window.location.href.split("/"));
  const [files, setFiles] = useState(null);

  const downloadLinkRef = useRef(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/${link[4]}/share`);
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFiles();
  }, []);

  const downloadFile = (file) => {
    const start = file.url.substr(0, 50);
    const end = file.url.slice(49);
    const url = start + `fl_attachment:${file.name}` + end;
    downloadLinkRef.current.href = url;
    downloadLinkRef.current.click();
  };

  return (
    <div className={styles.fileContainer}>
      {files && files.length ? (
        files.map((file) => (
          <div className={styles.fileCard} key={file.id}>
            <div className={styles.fileCardHeaders}>
              <button onClick={() => downloadFile(file)}>
                <Icon path={mdiDownload} title="Download"></Icon>
              </button>
              <p>
                {file.name}.{file.format}
              </p>
              <button></button>
            </div>
            <Link to={`/folder/${link[4]}/file/${file.id}/share`}>
              <div className={styles.file}>
                <img src={file.url}></img>
              </div>
            </Link>
            <DisplayFileSize file={file} />
            <a ref={downloadLinkRef} href=""></a>
          </div>
        ))
      ) : (
        <p>NO FILES.</p>
      )}
    </div>
  );
};

export default UnauthorizedFolder;
