import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

// @desc Auth user & get token
// @route POST /users/login
// @access Public

export const authUser = async (req: Request, res: Response) => {
  try {
    const { usOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usOrEmail }, { username: usOrEmail }],
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user?.password);
      if (passwordMatch) {
        res.json({
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profilePic: user.profilePic,
          token: generateToken(user._id),
          likes: user.likes,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc Register new user
// @route POST /api/users
// @access Public

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const userExist = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExist) {
      if (email === userExist.email) {
        res.status(400).json({ message: "Email already in use." });
      } else {
        res.status(400).json({ message: "Username already in use." });
      }
    }

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
        token: generateToken(user._id),
        likes: user.likes,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
