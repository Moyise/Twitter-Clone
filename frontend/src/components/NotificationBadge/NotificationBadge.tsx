import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLatestNotification } from "../../actions/notificationActions";
import { socket } from "../../service/socket";
import { reducerState } from "../../store";
import { ILatestNotification } from "../../types";
import "./notificationBadge.scss";

const NotificationBadge = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  const notificationLatest: ILatestNotification = useSelector(
    (state: reducerState) => state.notificationLatest
  );
  const { notification, success } = notificationLatest;

  useEffect(() => {
    const eventHandler = () => {
      dispatch(getLatestNotification());
      setActive(true);

      setTimeout(() => {
        setActive(false);
      }, 5000);
    };

    socket.on("notification received", eventHandler);

    return () => {
      socket.off("notification received", eventHandler);
    };
  }, [dispatch, success]);

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
      {notification && (
        <Link
          to={`${linkTo(notification)}`}
          className={active ? "notificationBadge active" : "notificationBadge"}
        >
          <p className="title">
            {notification.userFrom.firstName} {notification.userFrom.lastName}{" "}
            {notificationType(notification.notificationType)}
          </p>
        </Link>
      )}
    </>
  );
};

export default NotificationBadge;
