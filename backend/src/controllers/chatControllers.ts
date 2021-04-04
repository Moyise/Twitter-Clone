import { Request, Response } from "express";
import Chat from "../models/chatModel";

//@desc Create chat
//@route POST /api/chats
//@access Private

export const createChat = async (req: Request, res: Response) => {
  try {
    const users = req.body.users;
    users.push(req.body.user);

    const chat = await Chat.create({
      users: users,
      isGroupChat: true,
    });

    if (chat) {
      res.status(200).json(chat);
    }
  } catch (error) {
    res.status(404).json({ message: "Can't create chat" });
  }
};
