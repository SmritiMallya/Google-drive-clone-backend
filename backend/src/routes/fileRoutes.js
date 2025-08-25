import express from "express";
import multer from "multer";
import { verifyUser } from "../middlewares/authMiddleware.js";
import { uploadFile, listFiles, deleteFile, shareFile } from "../controllers/fileController.js";

const router = express.Router();
const upload = multer(); // handles multipart form-data

router.post("/upload", verifyUser, upload.single("file"), uploadFile);
router.get("/list", verifyUser, listFiles);
router.delete("/:filename", verifyUser, deleteFile);
router.post("/share", verifyUser, shareFile);

export default router;
