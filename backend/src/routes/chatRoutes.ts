import express from "express";
import {
  createChat,
  createGroupChat,
  getChatDetails,
  getChats,
  leaveGroupChat,
  markAllMessagesAsRead,
  updateGroupChat,
  updateGroupName,
} from "../controllers/chatControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createChat).get(protect, getChats);
router.route("/:id/leave").put(protect, leaveGroupChat);
router.route("/group").post(protect, createGroupChat);
router.route("/group/:id").post(protect, createGroupChat).put(protect, updateGroupChat);
router.route("/:id").get(protect, getChatDetails).put(protect, updateGroupName);

router.route("/:chatId/messages/markAsRead").put(protect, markAllMessagesAsRead);

export default router;
