import express from "express";
import post_signup, { login, logout, get_user } from "./controllers/userController.js";
import post_upload_file, {
  delete_file,
  get_file,
  get_folder_files,
  get_file_share
} from "./controllers/fileController.js";
import get_folders, {
  delete_folder,
  delete_folder_files,
  put_share_folder,
  get_shared_folder
} from "./controllers/folderController.js";

const router = express.Router();

// userController
router.post("/signup", post_signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/api/:id", get_user);

// fileController
router.post("/api/:id/upload", post_upload_file);
router.get("/api/:folderId/files", get_folder_files);
router.get("/api/:fileId/file", get_file);
router.delete("/api/:id/:folderId/delete/:fileId", delete_file);
router.get("/api/:fileId/file/share", get_file_share);

// folderController
router.get("/api/:id/folders", get_folders);
router.delete("/api/:id/delete/:folderId", delete_folder);
router.delete("/api/:id/delete/:folderId/files", delete_folder_files);
router.put("/api/:id/share/:folderId", put_share_folder);
router.get("/api/:folderId/share", get_shared_folder);

export default router;
