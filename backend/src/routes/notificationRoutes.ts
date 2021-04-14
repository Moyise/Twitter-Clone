import express from "express";
import {
  getLatestNotification,
  getNotifications,
  notificationAllOpened,
  notificationOpened,
} from "../controllers/notificationControllers";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getNotifications);
router.route("/latest").get(protect, getLatestNotification);
router.route("/:id/markAsOpened").put(notificationOpened);
router.route("/markAsOpened").put(notificationAllOpened);

export default router;
