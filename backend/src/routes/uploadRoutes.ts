import express from "express";
const router = express.Router();
import multer from "multer";
import { storage } from "../config/cloudinary";

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.send(req.file.path);
});

export default router;
