import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import "./postCard.scss";
import { IPost, ILike, IUserAuth } from "../../types";
import { timeDifference } from "../../timeFunction";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "../../store";
import { deletePost, likePost, retweetPost } from "../../actions/postActions";
import Modal from "../Modal/Modal";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const PostCard: FunctionComponent<IPost> = ({ post, liked, retweeted }) => {
  const history = useHistory();
  const ref = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    document.body.addEventListener("click", (e: any) => {
      if (ref.current?.contains(e.target)) {
        return;
      }
      setOpen(false);
    });
  }, []);

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

  const deleteHandler = () => {
    //    DELETE Post
    dispatch(deletePost(post._id));
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
            {post?.user._id === post?.replyTo.user._id ? null : post?.replyTo.user._id ===
              userInfo?._id ? null : (
              <p className="userRePost">You replied to {post?.replyTo.user.firstName}</p>
            )}
          </div>
        ) : null}
        <div className="postCardBottom">
          <div className="left">
            <img src={post.user.profilePic} alt="profile" />
          </div>
          <div className="middle">
            <Link to={`/profile/${post.user._id}`} className="middleTop">
              <p className="name">{post.user.firstName}</p>
              <p className="at">
                <span>@{post.user.username}</span>
                <span>.</span>
                <span>{timeDifference(new Date(), new Date(post.createdAt))}</span>
              </p>
            </Link>
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
                <span className="number">10</span>
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

          <div ref={ref} className="right">
            <div className="icon" onClick={() => setOpen(!open)}>
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
            <ul className={open ? "miniMenu open" : "miniMenu"}>
              {userInfo?._id === post.user._id && (
                <>
                  <li className="link" onClick={deleteHandler}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1667 18.3334H5.83333C4.91286 18.3334 4.16667 17.5872 4.16667 16.6667V5.83335H2.5V4.16669H5.83333V3.33335C5.83333 2.41288 6.57953 1.66669 7.5 1.66669H12.5C13.4205 1.66669 14.1667 2.41288 14.1667 3.33335V4.16669H17.5V5.83335H15.8333V16.6667C15.8333 17.5872 15.0871 18.3334 14.1667 18.3334ZM5.83333 5.83335V16.6667H14.1667V5.83335H5.83333ZM7.5 3.33335V4.16669H12.5V3.33335H7.5ZM12.5 15H10.8333V7.50002H12.5V15ZM9.16667 15H7.5V7.50002H9.16667V15Z"
                        fill="#FF003D"
                      />
                    </svg>
                    <p className="text">Delete</p>
                  </li>
                  <li className="link">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.4292 1.66669H6.57084C5.80834 1.66669 5.16667 2.14335 5.07167 2.77752L5.00001 3.33335C4.93334 3.78252 5.14501 4.15419 5.48668 4.46919C5.59084 4.56502 5.69584 4.66085 5.79918 4.75835C6.44584 5.36835 6.50751 6.30669 6.22251 7.14919L5.86501 8.20669C5.84446 8.29129 5.81942 8.37474 5.79001 8.45669C5.70751 8.68085 5.51501 9.17502 5.26501 9.60585C5.10667 9.87835 4.86668 10.0892 4.60418 10.2642C3.97418 10.6842 4.27084 11.6667 5.02917 11.6667H8.75001V13.4259C8.75001 14.4609 8.57501 15.4817 9.03751 16.4075L10 18.3334L10.9625 16.4084C11.4258 15.4817 11.25 14.4609 11.25 13.4259V11.6667H14.9708C15.7292 11.6667 16.0258 10.6834 15.3958 10.2634C15.1333 10.0884 14.8933 9.87835 14.735 9.60502C14.5291 9.23684 14.3535 8.85252 14.21 8.45585C14.1806 8.3739 14.1556 8.29045 14.135 8.20585L13.7775 7.14835C13.4942 6.30669 13.555 5.36835 14.2008 4.75835C14.3042 4.66085 14.4092 4.56502 14.5133 4.46919C14.855 4.15419 15.0667 3.78252 15 3.33335L14.9283 2.77752C14.8333 2.14335 14.1908 1.66669 13.4292 1.66669Z"
                        stroke="white"
                        strokeOpacity="0.9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="text">Pin to your profile</p>
                  </li>
                </>
              )}

              <li className="link">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33334 15.8333H1.66667C1.66667 13.0719 3.90525 10.8333 6.66667 10.8333C9.4281 10.8333 11.6667 13.0719 11.6667 15.8333H10C10 13.9924 8.50762 12.5 6.66667 12.5C4.82572 12.5 3.33334 13.9924 3.33334 15.8333ZM15.8333 13.3333H14.1667V10.8333H11.6667V9.16665H14.1667V6.66665H15.8333V9.16665H18.3333V10.8333H15.8333V13.3333ZM6.66667 9.99998C4.82572 9.99998 3.33334 8.5076 3.33334 6.66665C3.33334 4.8257 4.82572 3.33331 6.66667 3.33331C8.50762 3.33331 10 4.8257 10 6.66665C9.99771 8.50664 8.50667 9.99768 6.66667 9.99998ZM6.66667 4.99998C5.75617 5.0009 5.01491 5.73235 5.00186 6.64276C4.98882 7.55317 5.70881 8.30557 6.61891 8.33258C7.52902 8.35959 8.29237 7.65123 8.33334 6.74165V7.07498V6.66665C8.33334 5.74617 7.58715 4.99998 6.66667 4.99998Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>

                <p className="text">Follow</p>
              </li>
            </ul>
          </div>
        </div>
        <Modal post={post} showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default PostCard;
