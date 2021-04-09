import { model, Schema, Model, Document, Types } from "mongoose";

interface IChat extends Document {
  chatName: string;
  username: string;
  users: object[];
  isGroupChat: boolean;
  latestMessage: object;
  createdAt?: any;
  updatedAt?: any;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    chatName: { type: String, trim: true },
    username: { type: String, trim: true, unique: true, lowerCase: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Types.ObjectId, ref: "User" }],
    latestMessage: { type: Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Chat: Model<IChat> = model("Chat", chatSchema);

export default Chat;
