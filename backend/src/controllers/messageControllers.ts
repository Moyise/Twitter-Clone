import { Request, Response } from "express";
import Message from "../models/messageModel";
import Chat from "../models/chatModel";
import User from "../models/userModel";
import Notification from "../models/notificationModel";

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

    const chat = await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    if (chat) {
      chat.users.forEach((userId) => {
        if (userId.toString() === message.sender.toString()) return;

        (Notification as any).insertNotification(
          userId,
          message.sender,
          "newMessage",
          message.chat
        );
      });
    }

    if (message) {
      const popMessage = await Message.findById(message._id)
        .populate("chat")
        .populate("sender");
      await User.populate(popMessage, { path: "chat.users" });
      res.status(201).json(popMessage);
    }
  } catch (error) {
    res.status(404).json({ message: "Can't create message" });
  }
};

// @Fetch all chats
// @route GET /api/messages/:chatId
// @access Private

export const getMessagesByChatId = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chat: chatId }).populate("sender");

    if (messages) {
      res.status(201).json(messages);
    }
  } catch (error) {
    res.status(404).json({ message: "No Messages Found" });
  }
};
