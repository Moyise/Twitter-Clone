import express from "express";
import { authUser, registerUser } from "../controllers/userControllers";

const router = express.Router();

router.post("/signin", authUser);
router.route("/").post(registerUser);

export default router;
