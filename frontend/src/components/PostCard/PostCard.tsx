import React, { FunctionComponent, useState } from "react";
import "./postCard.scss";
import { IPost, ILike, IUserAuth } from "../../types";
import timeDifference from "../../timeFunction";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "../../store";
import { likePost, retweetPost } from "../../actions/postActions";
import Modal from "../Modal/Modal";
import { useHistory } from "react-router";

const PostCard: FunctionComponent<IPost> = ({ post, liked, retweeted }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const postLike: ILike = useSelector((state: reducerState) => state.postLike);
  const { success: likeSuccess } = postLike;

  const likesHandler = () => {
    if (userInfo) {
      dispatch(likePost(post._id, userInfo));
    }
  };

  const retweetHandler = () => {
    if (userInfo) {
      dispatch(retweetPost(post._id, userInfo));
    }
  };

  const postLinkHandler = (e: any) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <>
      <div className="postCard">
        {retweeted ? (
          <div className="postCardTop">
            <div className="icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.11111 16L1 12.8L4.11111 9.6V12H11.8889V8.8H13.4444V12.8C13.4444 13.2418 13.0962 13.6 12.6667 13.6H4.11111V16ZM4.11111 7.2H2.55556V3.2C2.55556 2.75817 2.90378 2.4 3.33333 2.4H11.8889V0L15 3.2L11.8889 6.4V4H4.11111V7.2Z"
                  fill="white"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <p className="userRePost">
              {post.user.username === userInfo?.username ? "You" : post.user.username}{" "}
              Retweeted
            </p>
          </div>
        ) : post.replyTo ? (
          <div className="postCardTop">
            {post.user._id === post.replyTo.user._id ? null : post.replyTo.user._id ===
              userInfo?._id ? null : (
              <p className="userRePost">You replied to {post.replyTo.user.firstName}</p>
            )}
          </div>
        ) : null}
        <div className="postCardBottom">
          <div className="left">
            <img src={post.user.profilePic} alt="profile" />
          </div>
          <div className="middle">
            <div className="middleTop">
              <p className="name">{post.user.firstName}</p>
              <p className="at">
                <span>@{post.user.username}</span>
                <span>.</span>
                <span>{timeDifference(new Date(), new Date(post.createdAt))}</span>
              </p>
            </div>
            <p onClick={postLinkHandler} className="middleBottom">
              {post.content || post.retweetData.content}
            </p>
            <div className="bottom">
              <div className="left-c" onClick={() => setShowModal(!showModal)}>
                <span className="icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.23 8.59468L14.2278 8.6053C13.9092 10.1178 12.8899 11.4163 11.4473 12.072L8.5 13.4117V11.8333H6.83333C4.53215 11.8333 2.66667 9.96785 2.66667 7.66667V6.83333C2.66667 4.53215 4.53215 2.66667 6.83333 2.66667H10.1667C12.4679 2.66667 14.3333 4.53215 14.3333 6.83333V7.66667C14.3333 7.98364 14.2982 8.29043 14.2324 8.58408L14.23 8.59468ZM6.83333 16L12.137 13.5893C14.0684 12.7113 15.4323 10.9731 15.8586 8.94882C15.9512 8.53625 16 8.10716 16 7.66667V6.83333C16 3.61167 13.3883 1 10.1667 1H6.83333C3.61167 1 1 3.61167 1 6.83333V7.66667C1 10.8883 3.61167 13.5 6.83333 13.5V16Z"
                      fill="white"
                      fillOpacity="0.2"
                    />
                  </svg>
                </span>
                <span className="number">4</span>
              </div>
              <div
                className={retweeted ? "middle-c active" : "middle-c"}
                onClick={retweetHandler}
              >
                <span className="icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.11111 16L1 12.8L4.11111 9.6V12H11.8889V8.8H13.4444V12.8C13.4444 13.2418 13.0962 13.6 12.6667 13.6H4.11111V16ZM4.11111 7.2H2.55556V3.2C2.55556 2.75817 2.90378 2.4 3.33333 2.4H11.8889V0L15 3.2L11.8889 6.4V4H4.11111V7.2Z"
                      fill="white"
                      fillOpacity="0.2"
                    />
                  </svg>
                </span>
                <span className="number">
                  {(post.retweetUsers.length > 0 && post.retweetUsers.length) ||
                    (post.retweetData?.retweetUsers.length > 0 &&
                      post.retweetData?.retweetUsers.length)}
                </span>
              </div>
              <div
                className={liked ? "right-c active" : "right-c"}
                onClick={likesHandler}
              >
                <span className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 14.9942C8.5485 14.5813 8.0382 14.1518 7.4985 13.6949H7.4915C5.59101 12.0924 3.43711 10.2791 2.48581 8.10627C2.17328 7.41454 2.00765 6.66193 2.00001 5.89884C1.99792 4.85177 2.40515 3.84803 3.12968 3.11447C3.8542 2.3809 4.83486 1.97944 5.85001 2.00081C6.67645 2.00216 7.48509 2.24847 8.1796 2.7104C8.48478 2.91466 8.7609 3.16174 9 3.44452C9.24044 3.16285 9.51663 2.91591 9.8211 2.7104C10.5153 2.24838 11.3238 2.00205 12.15 2.00081C13.1651 1.97944 14.1458 2.3809 14.8703 3.11447C15.5948 3.84803 16.0021 4.85177 16 5.89884C15.9928 6.66315 15.8272 7.41704 15.5142 8.10988C14.5629 10.2827 12.4097 12.0953 10.5092 13.6949L10.5022 13.7007C9.9618 14.1547 9.4522 14.5842 9.0007 15L9 14.9942ZM5.85001 3.44452C5.19797 3.43611 4.56906 3.69345 4.10001 4.16061C3.64808 4.61838 3.3955 5.24559 3.39995 5.89884C3.40794 6.45503 3.53009 7.00317 3.75841 7.50713C4.20747 8.44461 4.81339 9.29304 5.54831 10.0134C6.24201 10.7353 7.04 11.434 7.7302 12.0216C7.9213 12.184 8.1159 12.3479 8.3105 12.5118L8.433 12.615C8.6199 12.7724 8.8131 12.9355 9 13.0957L9.0091 13.0871L9.0133 13.0835H9.0175L9.0238 13.0784H9.0273H9.0308L9.0434 13.0676L9.0721 13.0438L9.077 13.0394L9.0847 13.0337H9.0889L9.0952 13.0279L9.56 12.6345L9.6818 12.5313C9.8785 12.3659 10.0731 12.2021 10.2642 12.0397C10.9544 11.4521 11.7531 10.754 12.4468 10.0286C13.1818 9.30857 13.7878 8.46035 14.2367 7.52301C14.4691 7.01468 14.593 6.46081 14.6 5.89884C14.6029 5.24761 14.3505 4.62281 13.9 4.16638C13.4318 3.69712 12.8028 3.43765 12.15 3.44452C11.3533 3.43754 10.5918 3.7819 10.057 4.39088L9 5.64691L7.943 4.39088C7.40825 3.7819 6.64666 3.43754 5.85001 3.44452Z"
                      fill="white"
                      fillOpacity="0.2"
                    />
                  </svg>
                </span>
                <span className="number">
                  {(post.likes.length > 0 && post.likes.length) ||
                    (post.retweetData?.likes.length > 0 &&
                      post.retweetData?.likes.length)}
                </span>
              </div>
            </div>
          </div>
          <div className="right">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 10.5C12.6716 10.5 12 9.82843 12 9C12 8.17157 12.6716 7.5 13.5 7.5C14.3284 7.5 15 8.17157 15 9C15 9.39782 14.842 9.77936 14.5607 10.0607C14.2794 10.342 13.8978 10.5 13.5 10.5ZM9 10.5C8.17157 10.5 7.5 9.82843 7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9C10.5 9.39782 10.342 9.77936 10.0607 10.0607C9.77935 10.342 9.39782 10.5 9 10.5ZM4.5 10.5C3.67157 10.5 3 9.82843 3 9C3 8.17157 3.67157 7.5 4.5 7.5C5.32843 7.5 6 8.17157 6 9C6 9.39782 5.84196 9.77936 5.56066 10.0607C5.27936 10.342 4.89782 10.5 4.5 10.5Z"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
          </div>
        </div>
        <Modal post={post} showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default PostCard;
