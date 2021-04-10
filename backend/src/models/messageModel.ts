import { model, Schema, Model, Document, Types } from "mongoose";

interface IMessage extends Document {
  content: string;
  sender: object;
  chat: object[];
  readBy: object[];
  createdAt?: any;
  updatedAt?: any;
}

const messageSchema: Schema<IMessage> = new Schema(
  {
    content: { type: String, trim: true },
    sender: { type: Types.ObjectId, ref: "User" },
    chat: { type: Types.ObjectId, ref: "Chat" },
    readBy: [{ type: Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessage> = model("Message", messageSchema);

export default Message;
