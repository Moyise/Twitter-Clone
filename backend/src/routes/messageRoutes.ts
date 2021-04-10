import express from "express";
import { getMessagesByChatId, newMessage } from "../controllers/messageControllers";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, newMessage);
router.route("/:chatId").get(protect, getMessagesByChatId);

export default router;
