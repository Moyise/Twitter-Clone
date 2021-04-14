import { Request, Response } from "express";
import Notification from "../models/notificationModel";

// @Fetch all user notifications
// @route GET /api/notifications
// @access Private

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userTo = req.body.user._id;

    let searchObj: any = { userTo, notificationType: { $ne: "newMessage" } };

    if (req.query.unreadOnly && req.query.unreadOnly === "true") {
      searchObj.opened = false;
    }

    const notifications = await Notification.find(searchObj)
      .populate("userTo")
      .populate("userFrom")
      .sort({ createdAt: -1 });

    if (notifications) {
      res.status(200).json(notifications);
    }
  } catch (error) {
    res.status(404).json({ message: "No Notifications Found" });
  }
};

// @update single notification to opened
// @route PUT /api/notifications/:id/markAsOpened
// @access Private

export const notificationOpened = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      opened: true,
    });

    if (notification) {
      res.status(200).json("success");
    }
  } catch (error) {
    res.status(404).json({ message: "No Notification Found" });
  }
};

// @update all notifications to opened
// @route PUT /api/notifications/markAsOpened
// @access Private

export const notificationAllOpened = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userInfo._id;
    const notifications = await Notification.updateMany(
      { userTo: userId },
      {
        opened: true,
      }
    );

    if (notifications) {
      res.status(200).json("success");
    }
  } catch (error) {
    res.status(404).json({ message: "No Notification Found" });
  }
};

// @Fetch latest notification
// @route GET /api/notifications/latest
// @access Private

export const getLatestNotification = async (req: Request, res: Response) => {
  try {
    const userTo = req.body.user._id;

    const notification = await Notification.findOne({ userTo })
      .populate("userTo")
      .populate("userFrom")
      .sort({ createdAt: -1 });

    if (notification) {
      res.status(200).json(notification);
    }
  } catch (error) {
    res.status(404).json({ message: "No Notification Found" });
  }
};
