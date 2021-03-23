import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import "./profileScreen.scss";
import cover from "../../img/cover.png";
import { useDispatch, useSelector } from "react-redux";
import { IPosts, IUser, IUserAuth } from "../../types";
import { reducerState } from "../../store";
import { detailsUser } from "../../actions/userActions";
import { userDate } from "../../timeFunction";
import { userPosts } from "../../actions/postActions";
import { POSTS_USER_RESET } from "../../constants/postConstants";
import PostCard from "../../components/PostCard/PostCard";

interface IParams {
  id: string;
}

const ProfileScreen = () => {
  const history = useHistory();
  const match = useRouteMatch<IParams>();

  const [toggleTab, setToggleTab] = useState(1);

  const dispatch = useDispatch();

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails: IUser = useSelector((state: reducerState) => state.userDetails);
  const { user, loading, error } = userDetails;

  const postsUser: IPosts = useSelector((state: reducerState) => state.postsUser);
  const { posts } = postsUser;

  const id = match.params.id;

  const tweets = posts?.filter((post) => {
    return !post.replyTo;
  });

  const replies = posts?.filter((post) => {
    return post.replyTo;
  });

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch({ type: POSTS_USER_RESET });
    dispatch(detailsUser(id));

    dispatch(userPosts(id));
  }, [dispatch, userInfo, history, id]);

  return (
    <>
      <div className="profileScreen">
        <div className="profileContainer">
          <div className="topDetails">
            <div className="icon" onClick={() => history.push("/home")}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z"
                  fill="#1A91DA"
                />
              </svg>
            </div>
            <p className="title">
              <span className="username">{user?.firstName}</span>
              <span className="tweets">22 Tweets</span>
            </p>
          </div>
          <div className="userDetails">
            <div className="userCover">
              <img src={cover} alt="cover" className="coverImg" />
              <img src={user?.profilePic} alt="profile" className="profilePic" />
            </div>
            <div className="userButtons">
              {userInfo?._id !== user?._id && (
                <div className="icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"
                      fill="#1A91DA"
                    />
                  </svg>
                </div>
              )}
              {userInfo?._id === user?._id ? (
                <button className="editProfile">Edit profile</button>
              ) : (
                <button className="editProfile">Follow</button>
              )}
            </div>
            <div className="profileDetails">
              <p className="firstName">{user?.firstName}</p>
              <p className="username">@{user?.username}</p>
              <div className="date">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.25 16.5H3.75C2.92157 16.5 2.25 15.8284 2.25 15V4.5C2.25 3.67157 2.92157 3 3.75 3H5.25V1.5H6.75V3H11.25V1.5H12.75V3H14.25C15.0784 3 15.75 3.67157 15.75 4.5V15C15.75 15.8284 15.0784 16.5 14.25 16.5ZM3.75 7.5V15H14.25V7.5H3.75ZM3.75 4.5V6H14.25V4.5H3.75ZM12.75 13.5H11.25V12H12.75V13.5ZM9.75 13.5H8.25V12H9.75V13.5ZM6.75 13.5H5.25V12H6.75V13.5ZM12.75 10.5H11.25V9H12.75V10.5ZM9.75 10.5H8.25V9H9.75V10.5ZM6.75 10.5H5.25V9H6.75V10.5Z"
                    fill="white"
                    fillOpacity="0.3"
                  />
                </svg>
                {user?.createdAt && <p>Joined {userDate(new Date(user?.createdAt))}</p>}
              </div>
              <div className="follows">
                <p className="following">
                  <span className="numb">3</span>
                  <span>Following</span>
                </p>
                <p className="followers">
                  <span className="numb">10</span>
                  <span>Followers</span>
                </p>
              </div>
            </div>
          </div>
          <div className="blockTabs">
            <div
              className={toggleTab === 1 ? "tabLeft active" : "tabLeft"}
              onClick={() => setToggleTab(1)}
            >
              <p>Tweets</p>
            </div>
            <div
              className={toggleTab === 2 ? "tabRight active" : "tabRight"}
              onClick={() => setToggleTab(2)}
            >
              <p>Replies</p>
            </div>
          </div>
          <div className="tabsContent">
            <div className={toggleTab === 1 ? "content active" : "content"}>
              {tweets?.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  liked={
                    post.likes.includes(userInfo?._id!) ||
                    post.retweetData?.likes.includes(userInfo?._id!)
                  }
                  retweeted={
                    post.retweetUsers.includes(userInfo?._id!) ||
                    post.retweetData?.retweetUsers.includes(userInfo?._id!)
                  }
                />
              ))}
            </div>
            <div className={toggleTab === 2 ? "content active" : "content"}>
              {replies?.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  liked={
                    post.likes.includes(userInfo?._id!) ||
                    post.retweetData?.likes.includes(userInfo?._id!)
                  }
                  retweeted={
                    post.retweetUsers.includes(userInfo?._id!) ||
                    post.retweetData?.retweetUsers.includes(userInfo?._id!)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
