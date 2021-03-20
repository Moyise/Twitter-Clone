import express from "express";
import {
  createPost,
  getPostById,
  getPosts,
  likePost,
  replyToPost,
  retweetPost,
} from "../controllers/postControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, createPost);
router.route("/:id").get(getPostById);
router.route("/:id/like").put(likePost);
router.route("/:id/retweet").post(retweetPost);
router.route("/:id/reply").post(protect, replyToPost);

export default router;
