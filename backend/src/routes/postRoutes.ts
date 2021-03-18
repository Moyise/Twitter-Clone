import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  retweetPost,
} from "../controllers/postControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, createPost);
router.route("/:id/like").put(likePost);
router.route("/:id/retweet").post(retweetPost);

export default router;
