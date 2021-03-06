import { Request, Response } from "express";
import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import User from "../models/userModel";

//@desc Create chat
//@route POST /api/chats
//@access Private

export const createChat = async (req: Request, res: Response) => {
  try {
    const users = req.body.users;
    const username = req.body.username;
    users.push(req.body.user);

    const existingChat = await Chat.findOne({ username });
    if (existingChat) {
      res.status(200).json(existingChat);
    } else {
      const chat = await Chat.create({
        username,
        users: users,
        isGroupChat: false,
      });
      if (chat) {
        res.status(200).json(chat);
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    res.status(404).json({ message: "Can't create chat" });
  }
};

//@desc Create group chat
//@route POST /api/chats
//@access Private

export const createGroupChat = async (req: Request, res: Response) => {
  try {
    let users = req.body.users;
    users.push(req.body.user);

    const chat = await Chat.create({
      users: users,
      isGroupChat: true,
    });

    if (chat) {
      res.status(200).json(chat);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({ message: "Can't create chat" });
  }
};

// @Fetch all chats
// @route GET /api/chats
// @access Private

export const getChats = async (req: Request, res: Response) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.body.user._id } },
    })
      .populate("users")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    await User.populate(chats, { path: "latestMessage.sender" });

    if (req.query.unreadOnly && req.query.unreadOnly === "true") {
      chats = chats.filter((r) => {
        if (r.latestMessage) {
          return !r.latestMessage.readBy.includes(req.body.user._id);
        }
      });
    }

    if (chats) {
      res.status(200).json(chats);
    }
  } catch (error) {
    res.status(404).json({ message: "No Chats Found" });
  }
};

// @Fetch single chats
// @route GET /api/chats/:id
// @access Private

export const getChatDetails = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const userId = req.body.user._id;

    const chat = await Chat.findOne({
      _id: chatId,
      users: { $elemMatch: { $eq: userId } },
    }).populate("users");

    if (!chat) {
      throw new Error("Chat doesn't exist");
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: "No Chat Found" });
  }
};

// @desc Update chat groupe name
// @route PUT /api/chats/:id
// @access private

export const updateGroupName = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    if (chat) {
      chat.chatName = req.body.groupName;

      await chat.save();
      res.status(200).json({ message: "Success" });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({ message: "Can't update chat" });
  }
};

// @update all messages to read
// @route PUT /api/chats/:chatId/messages/markAsRead
// @access Private

export const markAllMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userInfo._id;
    const chatId = req.params.chatId;
    const messages = await Message.updateMany(
      { chat: chatId },
      {
        $addToSet: { readBy: userId },
      }
    );

    if (messages) {
      res.status(200).json("success");
    }
  } catch (error) {
    res.status(404).json({ message: "No messages Found" });
  }
};

// @desc Add users to chat groupe
// @route PUT /api/chats/:id/group
// @access private

export const updateGroupChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const users = req.body.users;
    const chat = await Chat.findByIdAndUpdate(chatId, { $addToSet: { users: users } });
    if (chat) {
      res.status(200).json({ message: "Success" });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({ message: "Can't update chat" });
  }
};

// @desc Leave chat groupe
// @route PUT /api/chats/:id/leave
// @access private

export const leaveGroupChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const userId = req.body.user._id;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    );

    if (chat?.users.length === 0) {
      await Chat.findByIdAndRemove(chatId);
      const chats = await Message.find({ chat: chatId }).deleteMany({ chat: chatId });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(404).json({ message: "Error leaving chat" });
  }
};
