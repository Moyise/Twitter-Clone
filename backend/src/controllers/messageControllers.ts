import { Request, Response } from "express";
import Message from "../models/messageModel";

//@desc Create message
//@route POST /api/messages
//@access Private

export const newMessage = async (req: Request, res: Response) => {
  try {
    const chatId = req.body.chatId;
    const content = req.body.content;
    const userId = req.body.user._id;

    if (!chatId && !content && !userId) {
      throw new Error("Invalid data passed in");
    }

    const message = await Message.create({
      sender: userId,
      content,
      chat: chatId,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(404).json({ message: "Can't create message" });
  }
};
