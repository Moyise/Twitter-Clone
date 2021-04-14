import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import Post from "../models/postModel";
import User from "../models/userModel";
import Notification from "../models/notificationModel";

// @Fetch all followed users posts
// @route GET /api/posts
// @access Public

export const getPosts = async (req: Request, res: Response) => {
  try {
    let objectId = req.body.user.following;
    objectId.push(req.body.user._id);

    const posts = await Post.find({ user: { $in: objectId } })
      .populate("user")
      .populate("retweetData")
      .populate("replyTo")
      .sort({ createdAt: -1 });

    await User.populate(posts, { path: "replyTo.user" });
    await User.populate(posts, { path: "retweetData.user" });

    res.json({ posts });
  } catch (error) {
    res.status(404).json({ message: "No Posts Found" });
  }
};

// @Fetch all posts
// @route GET /api/posts
// @access Public

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const keyword: any = req.query.keyword
      ? { content: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const posts = await Post.find({ ...keyword })
      .populate("user")
      .populate("retweetData")
      .populate("replyTo")
      .sort({ createdAt: -1 });

    await User.populate(posts, { path: "replyTo.user" });
    await User.populate(posts, { path: "retweetData.user" });

    res.json({ posts });
  } catch (error) {
    res.status(404).json({ message: "No Posts Found" });
  }
};

// @Create a new post
// @route POST /api/posts
// @access Private

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const post = new Post({
      content,
      user: req.body.user._id,
    });
    await post.save();

    res.status(200).json({ message: "Tweet added" });
  } catch (error) {
    res.status(404).json({ message: "Can't Tweet" });
  }
};

// @Add like/dislike
// @route PUT /api/posts/:id/like
// @access Private

export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.body.user._id;

    const isLiked = req.body.user.likes && req.body.user.likes.includes(postId);

    const option = isLiked ? "$pull" : "$addToSet";

    // Insert user like
    const user = await User.findByIdAndUpdate(
      userId,
      { [option]: { likes: postId } },
      { new: true }
    );
    // Insert post like
    const post = await Post.findByIdAndUpdate(
      postId,
      { [option]: { likes: userId } },
      { new: true }
    )
      .populate("followers")
      .populate("following");

    if (!isLiked) {
      await (Notification as any).insertNotification(
        post?.user,
        userId,
        "tweetLike",
        post?._id
      );
    }

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
        token: generateToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("Can't Like");
  }
};

// @Add retweet
// @route PUT /api/posts/:id/retweet
// @access Private

export const retweetPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.body.user._id;

    // Try and delete retweet
    const deletedPost = await Post.findOneAndDelete({
      user: userId,
      retweetData: postId,
    });

    const option = deletedPost ? "$pull" : "$addToSet";

    let repost = deletedPost;

    if (repost === null) {
      repost = await Post.create({ user: userId, retweetData: postId });
    }

    // Insert user retweet
    const user = await User.findByIdAndUpdate(
      userId,
      { [option]: { retweets: repost._id } },
      { new: true }
    )
      .populate("followers")
      .populate("following");
    // Insert post retweet
    const post = await Post.findByIdAndUpdate(
      postId,
      { [option]: { retweetUsers: userId } },
      { new: true }
    );

    if (!deletedPost) {
      await (Notification as any).insertNotification(
        post?.user,
        userId,
        "retweet",
        post?._id
      );
    }

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
  } catch (error) {
    console.log(error);
    res.status(404).json("Can't Retweet");
  }
};

// @Add reply
// @route PUT /api/posts/:id/reply
// @access Private

export const replyToPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.body.user._id;

    const post = await Post.create({ user: userId, replyTo: postId, content });
    await Post.populate(post, { path: "replyTo" });

    if (post.replyTo) {
      await (Notification as any).insertNotification(
        post.replyTo.user,
        userId,
        "reply",
        post._id
      );
    }

    res.status(200).json({ message: "Reply success" });
  } catch (error) {
    res.status(404).json({ message: "Can't Reply" });
  }
};

//@desc Fetch single post
//@route GET /api/post/:id
//@access Private

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("user").populate("retweetData");

    if (post) {
      res.json(post);
    }
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (post) {
      await post.remove();
      res.json({ message: "Tweet removed" });
    }
  } catch (error) {
    res.status(404).json({ message: "Tweet not found" });
  }
};

//@desc Fetch all user posts
//@route GET /api/post/profile/:id
//@access Public

export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const posts = await Post.find({ user: id })
      .populate("user")
      .populate("retweetData")
      .populate("replyTo")
      .sort({ createdAt: -1 });

    await User.populate(posts, { path: "replyTo.user" });
    await User.populate(posts, { path: "retweetData.user" });

    if (posts) {
      res.json(posts);
    }
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};

//@desc Pin Post
//@route PUT /api/post/profile/:id
//@access Privet

export const pinPost = async (req: Request, res: Response) => {
  try {
    const postId = req.body.post._id;
    const id = req.params.id;

    const existPost = await Post.findById(postId).populate("user");

    if (req.body.post.pinned && existPost?.pinned === true) {
      const post = await Post.findByIdAndUpdate(postId, { pinned: false }, { new: true });
      if (post) {
        res.json({ message: "Post Unpinned" });
      }
    } else {
      await Post.updateMany({ user: id }, { pinned: false });
      const post = await Post.findByIdAndUpdate(postId, { pinned: true }, { new: true });

      if (post) {
        res.json({ message: "Post Pinned" });
      }
    }
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};
