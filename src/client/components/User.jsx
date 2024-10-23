import { Link, useOutletContext } from "react-router-dom";
import FolderList from "./FolderList";

const User = () => {
  const [
    user,
    setUser,
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
    selectedFile,
    setSelectedFile
  ] = useOutletContext();

  if (!user) {
    return <h2>UNAUTHORIZED USER.</h2>;
  } else {
    return (
      <>
        <FolderList
          user={user}
          folderList={folderList}
          setFolderList={setFolderList}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </>
    );
  }
};

export default User;
