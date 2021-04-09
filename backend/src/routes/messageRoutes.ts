import express from "express";
import { newMessage } from "../controllers/messageControllers";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, newMessage);

export default router;
