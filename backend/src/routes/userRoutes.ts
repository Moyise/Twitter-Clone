import express from "express";
import { authUser, getUserById, registerUser } from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signin", authUser);
router.route("/").post(registerUser);
router.route("/profile/:id").get(protect, getUserById);

export default router;
