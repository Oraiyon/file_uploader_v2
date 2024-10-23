import { useEffect, useState, useRef } from "react";
import styles from "../stylesheets/UnauthorizedFile.module.css";
import Navbar from "./Navbar";
import DisplayFileSize from "./DisplayFileSize";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";

const UnauthorizedFile = () => {
  const [link, setLink] = useState(window.location.href.split("/"));
  const [file, setFile] = useState(null);

  const downloadLinkRef = useRef(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/${link[6]}/file`);
        const data = await response.json();
        setFile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFile();
  }, []);

  const downloadFile = () => {
    const start = file.url.substr(0, 50);
    const end = file.url.slice(49);
    const url = start + `fl_attachment:${file.name}` + end;
    downloadLinkRef.current.href = url;
    downloadLinkRef.current.click();
  };

  if (file) {
    return (
      <div className={styles.fileContainer}>
        <div>
          <div className={styles.file_buttons}>
            <button>
              <Icon path={mdiDownload} title="Download" onClick={downloadFile}></Icon>
            </button>
            <h3>
              {file.name}.{file.format}
            </h3>
            <button></button>
            <a ref={downloadLinkRef} href=""></a>
          </div>
          <img src={file.url} alt={file.name} />
          <DisplayFileSize file={file} />
        </div>
      </div>
    );
  }
};

export default UnauthorizedFile;
