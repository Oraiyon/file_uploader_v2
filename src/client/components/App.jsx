import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";

const App = () => {
  const [user, setUser] = useState(null);
  const [folderList, setFolderList] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const foldersResponse = await fetch(`/api/${user.id}/folders`);
        const data = await foldersResponse.json();
        setFolderList(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchFolders();
    }
  }, [user]);

  return (
    <>
      <Header user={user} />
      <Outlet
        context={[
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
        ]}
      />
    </>
  );
};

export default App;
