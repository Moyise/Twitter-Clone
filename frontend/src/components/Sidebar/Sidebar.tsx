import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { getChats } from "../../actions/chatActions";
import { getUnreadNotifications } from "../../actions/notificationActions";
import { logout } from "../../actions/userActions";
import { socket } from "../../service/socket";
import { reducerState } from "../../store";
import { IChats, INotifications, IUserAuth } from "../../types";
import "./sidebar.scss";
import twitter from "../../img/twitter.svg";

interface IParams {
  id: string;
}

const Sidebar = () => {
  const match = useRouteMatch<IParams>();
  const dispatch = useDispatch();
  let ntf;
  const path = match.path;
  const url = match.url;

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const chatList: IChats = useSelector((state: reducerState) => state.chatList);
  const { chats } = chatList;

  const notificationList: INotifications = useSelector(
    (state: reducerState) => state.notificationList
  );
  const { notifications } = notificationList;

  if (notifications) {
    ntf = notifications.filter((notification) => notification.opened === false);
  }

  let userChats;
  if (userInfo && chats) {
    userChats = chats?.filter((chat) => {
      if (chat.latestMessage) {
        return !chat.latestMessage.readBy.includes(userInfo._id);
      } else {
        return 0;
      }
    });
  }

  useEffect(() => {
    const eventHandler = () => {
      dispatch(getUnreadNotifications());
    };
    const messageHandler = () => {
      dispatch(getChats());
    };

    socket.on("notification received", eventHandler);
    socket.on("message received", messageHandler);

    dispatch(getUnreadNotifications());
    dispatch(getChats());
    //dispatch(unreadChats());
  }, [dispatch]);

  const logoutHandler = () => {
    //dispatch logout
    dispatch(logout());
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebarContainer">
          <div className="sidebarLogo">
            <img src={twitter} alt="twitter" />
          </div>
          <ul className="sidebarLinks">
            <Link to="/home" className={path === "/home" ? "links active" : "links"}>
              <div className="icon">
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.6622 5.33398L25.3839 15.2501H25.3137H24.3137V16.2501V26.2501C24.3137 26.4069 24.1942 26.5001 24.0882 26.5001H18.9608V18.7501V17.7501H17.9608H13.0588H12.0588V18.7501V26.5001H6.93135C6.82539 26.5001 6.70586 26.4069 6.70586 26.2501V16.2501V15.2501H5.70586H5.63569L15.3573 5.33398C15.3574 5.33395 15.3574 5.33391 15.3574 5.33388C15.4439 5.2458 15.5757 5.2458 15.6621 5.33388C15.6622 5.33391 15.6622 5.33395 15.6622 5.33398Z"
                    stroke="white"
                    strokeOpacity="0.9"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="label">Home</p>
            </Link>
            <Link
              to="/search/posts"
              className={
                url === "/search/posts" || url === "/search/users"
                  ? "links active"
                  : "links"
              }
            >
              <div className="icon">
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7667 1.5C7.38036 1.5 2.25488 6.82876 2.25488 13.3374C2.25488 19.8461 7.38036 25.1748 13.7667 25.1748C20.153 25.1748 25.2785 19.8461 25.2785 13.3374C25.2785 10.2076 24.0728 7.20009 21.9175 4.97796C19.7611 2.7548 16.8298 1.5 13.7667 1.5ZM4.25488 13.3374C4.25488 7.87538 8.542 3.5 13.7667 3.5C16.2794 3.5 18.6955 4.52879 20.4819 6.37045C22.2692 8.21314 23.2785 10.7187 23.2785 13.3374C23.2785 18.7994 18.9914 23.1748 13.7667 23.1748C8.542 23.1748 4.25488 18.7994 4.25488 13.3374ZM24.1046 22.0678L27.2353 24.6455H27.2896C27.923 25.2985 27.923 26.3572 27.2896 27.0102C26.6563 27.6632 25.6293 27.6632 24.996 27.0102L22.3979 23.9731C22.1523 23.7207 22.0142 23.378 22.0142 23.0205C22.0142 22.663 22.1523 22.3202 22.3979 22.0678C22.8716 21.588 23.6309 21.588 24.1046 22.0678Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Explore</p>
            </Link>
            <Link
              to="/notifications"
              className={path === "/notifications" ? "links active" : "links"}
            >
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0588 3.5H16.9608V5.225V6.01122L17.7248 6.19676C19.0525 6.51919 20.0565 7.25421 20.7473 8.3673C21.4513 9.50175 21.8627 11.0858 21.8627 13.125V20V20.6125L22.4084 20.8908L24.3137 21.8625V22.75H6.70587V21.8625L8.61118 20.8908L9.15685 20.6125V20V13.125V13.1067L9.15618 13.0884C9.09807 11.501 9.44833 9.92673 10.1708 8.52225C10.8374 7.32812 11.9676 6.48714 13.2724 6.20193L14.0588 6.03002V5.225V3.5ZM15.8766 26.45H15.8374L15.7346 26.4718C15.6579 26.4881 15.58 26.4975 15.5018 26.4999C15.0829 26.494 14.6979 26.3046 14.4293 26H16.582C16.3927 26.2148 16.1482 26.3712 15.8766 26.45Z"
                    stroke="white"
                    strokeOpacity="0.9"
                    strokeWidth="2"
                  />
                </svg>
                {ntf && ntf.length > 0 && (
                  <div className="notificationCtn">
                    <span className="notification">{ntf.length}</span>
                  </div>
                )}
              </div>
              <p className="label">Notifications</p>
            </Link>
            <Link
              to="/messages"
              className={
                path === `/messages` ||
                path === `/messages/:id` ||
                path === `/messages/:id/info` ||
                path === `/messages/:id/participants`
                  ? "links active"
                  : "links"
              }
            >
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 25H5C3.61929 25 2.5 23.8807 2.5 22.5V7.39125C2.55826 6.05319 3.66067 4.99873 5 5H25C26.3807 5 27.5 6.11929 27.5 7.5V22.5C27.5 23.8807 26.3807 25 25 25ZM5 9.835V22.5H25V9.835L15 16.5L5 9.835ZM6 7.5L15 13.5L24 7.5H6Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
                {userChats && userChats.length > 0 && (
                  <div className="notificationCtn">
                    <span className="notification">{userChats.length}</span>
                  </div>
                )}
              </div>
              <p className="label">Messages</p>
            </Link>
            <Link
              to={`/profile/${userInfo?._id}`}
              className={
                url === `/profile/${userInfo?._id}` ||
                url === `/profile/${userInfo?._id}/following` ||
                url === `/profile/${userInfo?._id}/followers`
                  ? "links active"
                  : "links"
              }
            >
              <div className="icon">
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5098 1.5C11.3389 1.5 8.02206 4.90841 8.02206 9.11382C8.02206 13.319 11.3387 16.7289 15.5098 16.7289C19.6823 16.7289 22.9975 13.3188 22.9975 9.11382C22.9975 4.90853 19.682 1.5 15.5098 1.5ZM10.0221 9.11382C10.0221 5.97665 12.4794 3.5 15.5098 3.5C18.5412 3.5 20.9975 5.97652 20.9975 9.11382C20.9975 12.2514 18.541 14.7289 15.5098 14.7289C12.4797 14.7289 10.0221 12.2512 10.0221 9.11382ZM15.5098 17.9674C12.8429 17.9674 10.2485 18.1777 8.28944 18.8756C7.30269 19.2271 6.40803 19.7259 5.75342 20.4478C5.07873 21.1917 4.70587 22.1228 4.70587 23.2187C4.70587 24.3125 5.07562 25.2439 5.74636 25.9904C6.39764 26.7153 7.28898 27.2188 8.27471 27.5749C10.2314 28.2817 12.8269 28.5 15.5098 28.5C18.1767 28.5 20.7711 28.2897 22.7301 27.5919C23.7169 27.2403 24.6116 26.7415 25.2662 26.0197C25.9409 25.2757 26.3137 24.3446 26.3137 23.2487C26.3137 22.155 25.9441 21.2236 25.2735 20.4771C24.6223 19.7522 23.731 19.2486 22.7454 18.8925C20.7888 18.1857 18.1932 17.9674 15.5098 17.9674ZM6.70587 23.2187C6.70587 22.614 6.89757 22.1633 7.23493 21.7913C7.59239 21.3971 8.15729 21.0458 8.96058 20.7596C10.5816 20.1821 12.8892 19.9674 15.5098 19.9674C18.1433 19.9674 20.4497 20.1897 22.0658 20.7736C22.8665 21.0628 23.4294 21.417 23.7856 21.8136C24.1225 22.1886 24.3137 22.6424 24.3137 23.2487C24.3137 23.8534 24.122 24.3041 23.7847 24.6761C23.4272 25.0703 22.8623 25.4217 22.059 25.7078C20.438 26.2853 18.1304 26.5 15.5098 26.5C12.8769 26.5 10.5705 26.2777 8.95417 25.6938C8.15338 25.4046 7.59043 25.0503 7.23406 24.6537C6.89715 24.2787 6.70587 23.825 6.70587 23.2187Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Profile</p>
            </Link>
            <li className="links" onClick={logoutHandler}>
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.75 26.25H6.25C4.86929 26.25 3.75 25.1307 3.75 23.75V18.75H6.25V23.75H23.75V6.25H6.25V11.25H3.75V6.25C3.75 4.86929 4.86929 3.75 6.25 3.75H23.75C25.1307 3.75 26.25 4.86929 26.25 6.25V23.75C26.25 25.1307 25.1307 26.25 23.75 26.25ZM13.75 20V16.25H3.75V13.75H13.75V10L20 15L13.75 20Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Log out</p>
            </li>
            <Link to={`/profile/${userInfo?._id}`} className="lastLink">
              <div className="profile">
                <img src={userInfo?.profilePic} alt="profile" />
              </div>
              <div className="label">
                <div className="profileDes">
                  <p>{userInfo?.firstName}</p>
                  {userInfo?.isVerified && (
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 14.6667C4.31977 14.6626 1.33737 11.6802 1.33333 7.99999V7.86666C1.40662 4.20301 4.42305 1.2853 8.08711 1.33391C11.7512 1.38253 14.6891 4.37925 14.6652 8.04355C14.6412 11.7079 11.6644 14.6659 8 14.6667ZM4.93999 7.72666L3.99999 8.66666L6.66666 11.3333L12 5.99999L11.06 5.05332L6.66666 9.44666L4.93999 7.72666Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="bottom">@{userInfo?.username}</p>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
