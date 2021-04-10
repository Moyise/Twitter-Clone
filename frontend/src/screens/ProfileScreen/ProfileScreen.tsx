import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import "./profileScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { IChat, IPinPost, IPosts, IUser, IUserAuth } from "../../types";
import { reducerState } from "../../store";
import { detailsUser, followUser } from "../../actions/userActions";
import { userDate } from "../../timeFunction";
import { userPosts } from "../../actions/postActions";
import { POSTS_USER_RESET } from "../../constants/postConstants";
import PostCard from "../../components/PostCard/PostCard";
import EditProfile from "../../components/EditProfile/EditProfile";
import PinPost from "../../components/PinPost/PinPost";
import { createChat } from "../../actions/chatActions";
import { CHAT_CREATE_RESET } from "../../constants/chatConstants";

interface IParams {
  id: string;
}

const ProfileScreen = () => {
  const history = useHistory();
  const match = useRouteMatch<IParams>();

  const [toggleTab, setToggleTab] = useState(1);
  const [followButton, setFollowButton] = useState("Following");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails: IUser = useSelector((state: reducerState) => state.userDetails);
  const { user, loading } = userDetails;

  const postsUser: IPosts = useSelector((state: reducerState) => state.postsUser);
  const { posts } = postsUser;

  const postPin: IPinPost = useSelector((state: reducerState) => state.postPin);
  const { success } = postPin;

  const chatCreate: IChat = useSelector((state: reducerState) => state.chatCreate);
  const { success: createSuccess, chat } = chatCreate;

  const id = match.params.id;

  const tweets = posts?.filter((post) => {
    return !post.replyTo;
  });

  const replies = posts?.filter((post) => {
    return post.replyTo;
  });

  const pinnedPost = posts?.filter((post) => {
    return post.pinned === true;
  });

  const following = userInfo?.following.map((follow) => follow._id).includes(user?._id!);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (createSuccess) {
      history.push(`/messages/${chat?._id}`);
      dispatch({ type: CHAT_CREATE_RESET });
    }

    dispatch({ type: POSTS_USER_RESET });
    dispatch(detailsUser(id));
    dispatch(userPosts(id));
  }, [dispatch, userInfo, history, id, success, createSuccess, chat]);

  const followHandler = () => {
    if (userInfo) {
      dispatch(followUser(id, userInfo?._id));
    }
  };

  const clickHandler = () => {
    //Dispatch
    if (user) {
      dispatch(createChat([user], user.username));
    }
  };

  return (
    <>
      <div className="profileScreen">
        {loading ? (
          <div className="loading">
            <i
              className="fas fa-spinner fa-spin fa-2x"
              style={{ color: "rgba(0, 238, 255, 0.9)" }}
            ></i>
          </div>
        ) : (
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
                <span className="tweets">
                  {replies && tweets ? tweets.length + replies.length : 0} Tweets
                </span>
              </p>
            </div>
            <div className="userDetails">
              <div className="userCover">
                <img src={user?.coverPic} alt="cover" className="coverImg" />
                <img src={user?.profilePic} alt="profile" className="profilePic" />
              </div>
              <div className="userButtons">
                {userInfo?._id !== user?._id && (
                  <div className="icon" onClick={clickHandler}>
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
                  <button
                    className="editProfile"
                    onClick={() => setShowModal(!showModal)}
                  >
                    Edit profile
                  </button>
                ) : (
                  <button
                    className={following ? "followButton active" : "followButton"}
                    onClick={followHandler}
                    onMouseOver={() => setFollowButton("Unfollow")}
                    onMouseOut={() => setFollowButton("Following")}
                  >
                    {following ? followButton : "Follow"}
                  </button>
                )}
              </div>
              <div className="profileDetails">
                <p className="firstName">{user?.firstName}</p>
                <p className="username">@{user?.username}</p>
                {user?.bio && <p className="bio">{user?.bio}</p>}
                <div className="detailsWrap">
                  <div className="wrap">
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
                    {user?.createdAt && (
                      <p>Joined {userDate(new Date(user?.createdAt))}</p>
                    )}
                  </div>
                  <div className="wrap">
                    {user?.website && (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.34869 15.4013C4.83207 15.4013 3.46477 14.4877 2.88429 13.0866C2.30381 11.6854 2.62444 10.0726 3.69669 9.00002L5.28819 7.40852L6.34869 8.46901L4.75794 10.0598C4.18949 10.6282 3.96748 11.4568 4.17555 12.2333C4.38362 13.0098 4.99015 13.6163 5.76667 13.8244C6.5432 14.0325 7.37174 13.8105 7.94019 13.242L9.53094 11.6513L10.5914 12.7125L9.00069 14.3033C8.29875 15.0087 7.34383 15.404 6.34869 15.4013ZM6.87894 12.1815L5.81844 11.121L11.1217 5.81776L12.1822 6.87827L6.87969 12.1808L6.87894 12.1815ZM12.7132 10.5908L11.6519 9.53026L13.2427 7.93951C13.8189 7.37276 14.0468 6.54051 13.8399 5.75925C13.6329 4.97799 13.0228 4.36775 12.2416 4.1606C11.4604 3.95345 10.6281 4.1812 10.0612 4.75726L8.46969 6.34802L7.40919 5.28752L9.00069 3.69602C10.467 2.24249 12.8324 2.24767 14.2924 3.7076C15.7523 5.16754 15.7575 7.53295 14.3039 8.99926L12.7132 10.59V10.5908Z"
                            fill="white"
                            fillOpacity="0.3"
                          />
                        </svg>

                        <a
                          className="link"
                          href={`${user.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {user.website}
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="follows">
                  <p className="following">
                    <span className="numb">{user?.following.length}</span>
                    <Link to={`/profile/${id}/following`} className="link">
                      Following
                    </Link>
                  </p>
                  <p className="followers">
                    <span className="numb">{user?.followers.length}</span>
                    <Link to={`/profile/${id}/followers`} className="link">
                      Followers
                    </Link>
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
            {pinnedPost && (
              <div>
                {pinnedPost?.map((post) => (
                  <PinPost
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
            )}

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
        )}

        <EditProfile user={user} showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default ProfileScreen;
