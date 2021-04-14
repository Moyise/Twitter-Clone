import { Request, Response } from "express";
import User from "../models/userModel";
import Notification from "../models/notificationModel";
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
    })
      .populate("followers")
      .populate("following");

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
          coverPic: user.coverPic,
          following: user.following,
          followers: user.followers,
          token: generateToken(user._id),
          likes: user.likes,
          isVerified: user.isVerified,
          bio: user.bio,
          website: user.website,
          retweets: user.retweets,
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
        coverPic: user.coverPic,
        following: user.following,
        followers: user.followers,
        token: generateToken(user._id),
        likes: user.likes,
        retweets: user.retweets,
        isVerified: user.isVerified,
        bio: user.bio,
        website: user.website,
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

//@desc Fetch single user
//@route GET /api/users/profile/:id
//@access Private

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("followers").populate("following");

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
        coverPic: user.coverPic,
        following: user.following,
        followers: user.followers,
        likes: user.likes,
        retweets: user.retweets,
        isVerified: user.isVerified,
        bio: user.bio,
        website: user.website,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

//@desc Follow user
//@route PUT /api/users/:id/follow
//@access Private

export const followUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = req.body.user.id;

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const isFollowing = user.followers && user.followers.includes(userId);
    const option = isFollowing ? "$pull" : "$addToSet";

    await User.findByIdAndUpdate(id, { [option]: { followers: userId } });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        [option]: { following: id },
      },
      { new: true }
    )
      .populate("followers")
      .populate("following");

    if (!isFollowing) {
      await (Notification as any).insertNotification(id, userId, "follow", userId);
    }

    if (updatedUser) {
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        coverPic: updatedUser.coverPic,
        following: updatedUser.following,
        followers: updatedUser.followers,
        token: generateToken(updatedUser._id),
        likes: updatedUser.likes,
        retweets: updatedUser.retweets,
        isVerified: user.isVerified,
        bio: user.bio,
        website: user.website,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc Update profile
// @route PUT /api/users/profile
// @access private

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user = await User.findById(id).populate("followers").populate("following");

    if (user) {
      user.firstName = req.body.name || user.firstName;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.coverPic = req.body.coverPic || user.coverPic;
      user.bio = req.body.bio || user.bio;
      user.website = req.body.website || user.website;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        coverPic: updatedUser.coverPic,
        following: updatedUser.following,
        followers: updatedUser.followers,
        token: generateToken(updatedUser._id),
        likes: updatedUser.likes,
        retweets: updatedUser.retweets,
        isVerified: user.isVerified,
        bio: user.bio,
        website: user.website,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({ message: "Can't update profile" });
  }
};

//@desc Fetch All users
//@route GET /api/users
//@access Private

export const getUser = async (req: Request, res: Response) => {
  try {
    const keyword: any = req.query.keyword
      ? {
          $or: [
            { username: { $regex: req.query.keyword, $options: "i" } },
            { firstName: { $regex: req.query.keyword, $options: "i" } },
            { lastName: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find({ ...keyword });

    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "Users Empty" });
  }
};
