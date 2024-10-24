import { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiClose, mdiContentCopy } from "@mdi/js";
import styles from "../stylesheets/ShareFolderModal.module.css";

const ShareFolderModal = (props) => {
  const [shareLink, setShareLink] = useState("");
  const [shareDuration, setShareDuration] = useState(null);

  const shareFolderModal = useRef(null);
  const shareDurationRef = useRef(null);

  useEffect(() => {
    if (props.folderToBeShared) {
      setShareLink(window.location.origin + "/folder/" + props.folderToBeShared.id + "/share");
    }
  }, [props.folderToBeShared]);

  const submitShareDuration = async () => {
    try {
      const response = await fetch(`/api/${props.user.id}/share/${props.folderToBeShared.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          length: shareDurationRef.current.value
        })
      });
      const data = await response.json();
      setShareLink(window.location.origin + "/folder/" + data.id + "/share");
      setShareDuration(shareDurationRef.current.value);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch (error) {
      console.log(error);
    }
  };

  if (props.displayShareFolderModal) {
    return (
      <div className={styles.shareFolderModal} ref={shareFolderModal}>
        <button onClick={() => props.closeModal(setShareDuration)}>
          <Icon path={mdiClose}></Icon>
        </button>
        {!shareDuration ? (
          <div className={styles.shareInfo}>
            {props.folderToBeShared.share_Date ? (
              <div>
                <p>Current Link:</p>
                <p>{window.location.origin + "/folder/" + props.folderToBeShared.id + "/share"}</p>
                <button onClick={copyLink}>
                  <Icon path={mdiContentCopy}></Icon>
                </button>
              </div>
            ) : (
              ""
            )}
            <div>
              {props.folderToBeShared.share_Date ? (
                <label htmlFor="shareDuration">New Share Length:</label>
              ) : (
                <label htmlFor="shareDuration">Share Length:</label>
              )}
              <select name="shareDuration" id="shareDuration" ref={shareDurationRef}>
                <option value="1">1 Day</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </select>
            </div>
            <button onClick={submitShareDuration}>Create Link</button>
          </div>
        ) : (
          <div className={styles.shareLink}>
            <p>Link:</p>
            <p>{shareLink}</p>
            <button onClick={copyLink}>
              <Icon path={mdiContentCopy}></Icon>
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default ShareFolderModal;
