import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reducerState } from "../../store";
import { IFollow, IUserAuth } from "../../types";
import "./userCard.scss";

const UserCard: FunctionComponent<IFollow> = ({ follow, onClick }) => {
  const [followButton, setFollowButton] = useState("Following");

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const following = userInfo?.following
    .map((follow) => follow._id)
    .includes(follow?._id!);

  const followYou = userInfo?.followers.map((user) => user._id).includes(follow._id);

  return (
    <>
      <div className="userCard">
        <div className="left">
          <img className="profile" src={follow?.profilePic} alt="profile" />
        </div>
        <div className="middle">
          <div className="user">
            <Link to={`/profile/${follow._id}`} className="name">
              {follow?.firstName}
            </Link>
            {follow?.isVerified && (
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
            <span>@{follow?.username} </span>
            {followYou && <span className="followsYou">Follows you</span>}
          </p>
        </div>
        <div className="right">
          {userInfo?._id === follow?._id ? (
            ""
          ) : (
            <button
              className={following ? "followButton active" : "followButton"}
              onClick={() => onClick(follow._id)}
              onMouseOver={() => setFollowButton("Unfollow")}
              onMouseOut={() => setFollowButton("Following")}
            >
              {following ? followButton : "Follow"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
