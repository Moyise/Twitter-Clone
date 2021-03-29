import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import Post from "../models/postModel";
import User from "../models/userModel";

// @Fetch all posts
// @route GET /api/posts
// @access Public

export const getPosts = async (req: Request, res: Response) => {
  try {
    // const followingArr: string[] = req.body.user.following;
    // const id = req.body.user._id;
    // const userArr = [...followingArr, id];
    // console.log(userArr);
    // const newPosts = await Post.find({
    //   user: { $all: [`${userArr}`] },
    // });

    //console.log(newPosts);
    // let results: any;
    // userArr.forEach(async (userId) => {
    //   //let results: object[] = [];
    //   const test1 = await Post.find({
    //     user: { $all: [`${userId}`] },
    //   });
    //console.log(test1);

    // results.push(test1);
    // });
    //console.log(results);

    // userArr.forEach(async (user) => {
    //   const newPosts = await Post.find({ user: { $all: [`${user}`] } });
    //   console.log(newPosts);
    // });

    const posts = await Post.find()
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
    await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true });

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
    );
    // Insert post retweet
    await Post.findByIdAndUpdate(
      postId,
      { [option]: { retweetUsers: userId } },
      { new: true }
    );

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

    await Post.create({ user: userId, replyTo: postId, content });

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
