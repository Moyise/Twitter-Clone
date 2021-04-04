import express from "express";
import { createChat } from "../controllers/chatControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createChat);

export default router;
