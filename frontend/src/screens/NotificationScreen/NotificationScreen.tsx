import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  openAllNotifications,
  openNotification,
} from "../../actions/notificationActions";
import { reducerState } from "../../store";
import { INotifications, IReadNotification } from "../../types";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import "./notificationScreen.scss";

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const notificationOpen: IReadNotification = useSelector(
    (state: reducerState) => state.notificationOpen
  );
  const { success } = notificationOpen;

  const notificationOpenAll: IReadNotification = useSelector(
    (state: reducerState) => state.notificationOpenAll
  );
  const { success: openAllSuccess } = notificationOpenAll;

  const notificationList: INotifications = useSelector(
    (state: reducerState) => state.notificationList
  );
  const { notifications, loading } = notificationList;

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch, success, openAllSuccess]);

  const clickHandler = (notificationId: string) => {
    if (notificationId) {
      dispatch(openNotification(notificationId));
    }
  };

  return (
    <>
      <div className="notificationScreen">
        {loading ? (
          <div className="loading">
            <i
              className="fas fa-spinner fa-spin fa-2x"
              style={{ color: "rgba(0, 238, 255, 0.9)" }}
            ></i>
          </div>
        ) : (
          <div className="notificationCtn">
            <div className="notificationTop">
              <div className="title">Notifications</div>
              <div className="icon" onClick={() => dispatch(openAllNotifications())}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.33252 13.0651L5.98779 18.7204L7.39779 17.3004L1.7475 11.6501L0.33252 13.0651ZM22.247 5.28112L11.6478 15.8904L7.41094 11.6435L5.98094 13.0535L11.6478 18.7204L23.667 6.70112L22.247 5.28112ZM18.0086 6.69954L16.5986 5.27954L10.2278 11.6504L11.6478 13.0604L18.0086 6.69954Z"
                    fill="#1A85C7"
                  />
                </svg>
              </div>
            </div>
            <div className="notificationBottom">
              {notifications &&
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    onClick={clickHandler}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationScreen;
