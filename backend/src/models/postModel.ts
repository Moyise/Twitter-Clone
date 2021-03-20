import { model, Schema, Model, Document, Types } from "mongoose";

interface IPost extends Document {
  user: Types.ObjectId | Record<string, unknown>;
  content: string;
  pinned: boolean;
  likes: object[];
  retweetUsers: object[];
  retweetData: string;
  replyTo: string;
}

const postSchema: Schema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    content: { type: String, trim: true },
    pinned: { type: Boolean, default: false },
    likes: [{ type: Types.ObjectId, ref: "User" }],
    retweetUsers: [{ type: Types.ObjectId, ref: "User" }],
    retweetData: { type: Types.ObjectId, ref: "Post" },
    replyTo: { type: Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = model("Post", postSchema);

export default Post;
