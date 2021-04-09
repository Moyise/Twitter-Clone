import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPosts,
  getPostsByUser,
  likePost,
  pinPost,
  replyToPost,
  retweetPost,
} from "../controllers/postControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, createPost);
router.route("/search").get(protect, getAllPosts);
router.route("/:id").get(getPostById);
router.route("/:id").delete(protect, deletePost);
router.route("/:id/like").put(likePost);
router.route("/:id/retweet").post(retweetPost);
router.route("/:id/reply").post(protect, replyToPost);
router.route("/profile/:id").get(protect, getPostsByUser).put(protect, pinPost);

export default router;
