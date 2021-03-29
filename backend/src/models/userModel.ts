import { model, Schema, Model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  coverPic: string;
  likes: object[];
  retweets: object[];
  following: object[];
  followers: object[];
  isVerified: boolean;
  bio: string;
  website: string;
  createdAt?: any;
  updatedAt?: any;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true, lowerCase: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profile.png" },
    coverPic: { type: String, default: "/images/cover.png" },
    likes: [{ type: Types.ObjectId, ref: "Post" }],
    retweets: [{ type: Types.ObjectId, ref: "Post" }],
    following: [{ type: Types.ObjectId, ref: "User" }],
    followers: [{ type: Types.ObjectId, ref: "User" }],
    isVerified: { type: Boolean, required: true, default: false },
    bio: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User: Model<IUser> = model("User", userSchema);

export default User;
