import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { INotification } from "../../types";
import "./notificationCard.scss";

const NotificationCard: FunctionComponent<INotification> = ({
  notification,
  onClick,
}) => {
  const notificationType = (type: string) => {
    if (type === "follow") {
      return "followed you";
    } else if (type === "reply") {
      return "replied to your tweet";
    } else if (type === "retweet") {
      return "retweeted your tweet";
    } else if (type === "tweetLike") {
      return "liked your tweet";
    }
  };

  const linkTo = (data: any) => {
    if (data.notificationType === "follow") {
      return `/profile/${data.entityId}`;
    } else if (
      data.notificationType === "reply" ||
      data.notificationType === "retweet" ||
      data.notificationType === "tweetLike"
    ) {
      return `/posts/${data.entityId}`;
    }
  };

  return (
    <>
      <Link
        to={`${linkTo(notification)}`}
        className={notification.opened ? "notificationCard opened" : "notificationCard"}
        onClick={() => onClick(notification._id)}
      >
        <img className="profile" src={notification.userFrom.profilePic} alt="profile" />

        <p className="text">
          {notification.userFrom.firstName} {notification.userFrom.lastName}{" "}
          {notificationType(notification.notificationType)}
        </p>
      </Link>
    </>
  );
};

export default NotificationCard;
