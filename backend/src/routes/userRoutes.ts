import express from "express";
import {
  authUser,
  followUser,
  getUser,
  getUserById,
  registerUser,
  updateProfile,
} from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signin", authUser);
router.route("/").post(registerUser).get(getUser);
router.route("/:id").get(getUserById);
router.route("/profile/:id").get(protect, getUserById);
router.route("/:id/follow").put(protect, followUser);
router.route("/profile").put(protect, updateProfile);

export default router;
