import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import User from "./components/User";
import UploadFileForm from "./components/UploadFileForm";
import Folder from "./components/Folder";
import File from "./components/File";
import UnauthorizedFolder from "./components/UnauthorizedFolder";
import UnauthorizedFile from "./components/UnauthorizedFile";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <User />
        },
        {
          path: "/signup",
          element: <SignUp />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/:id",
          element: <User />
        },
        {
          path: "/:id/upload",
          element: <UploadFileForm />
        },
        {
          path: "/:id/folder/:folderId",
          element: <Folder />
        },
        {
          path: "/:id/folder/:folderId/file/:fileId",
          element: <File />
        },
        {
          path: "/folder/:folderId/share",
          element: <UnauthorizedFolder />
        },
        {
          path: "/folder/:folderId/file/:fileId/share",
          element: <UnauthorizedFile />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
