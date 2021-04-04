import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { reducerState } from "../../store";
import { IUserMessage, IUserAuth } from "../../types";
import "./userMessage.scss";

const UserMessage: FunctionComponent<IUserMessage> = ({ user, onClick }) => {
  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const following = userInfo?.following.map((user) => user._id).includes(user._id);

  return (
    <>
      {userInfo?._id !== user?._id && (
        <div className="userMessageCard" onClick={() => onClick(user?._id)}>
          <div className="left">
            <img className="profile" src={user?.profilePic} alt="profile" />
          </div>
          <div className="middle">
            {following && (
              <div className="following">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.64697 3.64553C8.64697 5.11404 7.46953 6.29155 5.99998 6.29155C4.53093 6.29155 3.35299 5.11404 3.35299 3.64553C3.35299 2.17701 4.53093 1 5.99998 1C7.46953 1 8.64697 2.17701 8.64697 3.64553ZM6 11C3.83119 11 2 10.6475 2 9.28747C2 7.92696 3.84269 7.58696 6 7.58696C8.16931 7.58696 10 7.93946 10 9.29947C10 10.66 8.15731 11 6 11Z"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>
                <p className="desc">Following</p>
              </div>
            )}
            <div className="user">
              <p className="name">{user?.firstName}</p>
              {user?.isVerified && (
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
            <p className="bottom">
              <span>@{user?.username.substring(0, 4)} </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessage;
