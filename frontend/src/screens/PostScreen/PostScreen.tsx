import React, { useEffect, useRef, useState } from "react";
import "./postScreen.scss";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, detailsPost, listPosts } from "../../actions/postActions";
import { reducerState } from "../../store";
import {
  IPostDetails,
  IPosts,
  IUserAuth,
  ICreatePost,
  IPostReply,
  IDelete,
} from "../../types";
import { postDate, postTime } from "../../timeFunction";
import PostCard from "../../components/PostCard/PostCard";
import Modal from "../../components/Modal/Modal";
import { POST_DELETE_RESET } from "../../constants/postConstants";

interface RouteParams {
  id: string;
}

const PostScreen = () => {
  const match = useRouteMatch<RouteParams>();
  const history = useHistory();
  const id = match.params.id;
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const postList: IPosts = useSelector((state: reducerState) => state.postList);
  const { posts } = postList;

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const postCreate: ICreatePost = useSelector((state: reducerState) => state.postCreate);
  const { success } = postCreate;

  const postReply: IPostReply = useSelector((state: reducerState) => state.postReply);
  const { success: replySuccess } = postReply;

  const postDetails: IPostDetails = useSelector(
    (state: reducerState) => state.postDetails
  );
  const { post } = postDetails;

  const postDelete: IDelete = useSelector((state: reducerState) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const results = posts?.filter((post) => {
    return post.replyTo?._id === id;
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!userInfo) {
      history.push("/login");
    }

    document.body.addEventListener("click", (e: any) => {
      if (ref.current?.contains(e.target)) {
        return;
      }
      setOpen(false);
    });

    dispatch(detailsPost(id));
    dispatch(listPosts());
    if (deleteSuccess) {
      dispatch({ type: POST_DELETE_RESET });
      history.push("/home");
    }
  }, [dispatch, id, pathname, success, replySuccess, userInfo, deleteSuccess, history]);

  const deleteHandler = () => {
    //    DELETE Post
    if (post) {
      dispatch(deletePost(post._id));
    }
  };

  return (
    <>
      <div className="postScreen">
        <div className="postContainer">
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
            <p className="title">Tweet</p>
          </div>
          <div className="postDetails">
            <div className="left">
              <div className="top">
                <img src={post?.user.profilePic} alt="profile" />
                <div className="label">
                  <p className="top">{post?.user.firstName}</p>
                  <p className="bottom">@{post?.user.username}</p>
                </div>
              </div>
              <div className="middle">
                <p className="postText">{post?.content || post?.retweetData.content}</p>
              </div>
              <div className="bottom">
                <div className="bottomTop">
                  <p>
                    <span>{post?.createdAt && postTime(new Date(post?.createdAt))}</span>
                    <span>.</span>
                    <span>{post?.createdAt && postDate(new Date(post?.createdAt))}</span>
                  </p>
                </div>
                <div className="bottomMiddle">
                  <p>
                    <span className="number">
                      {post?.retweetUsers.length ||
                        post?.retweetData?.retweetUsers.length}
                    </span>
                    <span className="label">Retweets</span>
                    <span className="number">
                      {post?.likes.length || post?.retweetData?.likes.length}
                    </span>
                    <span className="label">Likes</span>
                  </p>
                </div>
                <div className="bottomBottom">
                  <div className="bLeft" onClick={() => setShowModal(!showModal)}>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.876 12.1136L15.8733 12.1264C15.491 13.9413 14.2679 15.4995 12.5368 16.2864L9 17.894V16H7C4.23858 16 2 13.7614 2 11V10C2 7.23858 4.23858 5 7 5H11C13.7614 5 16 7.23858 16 10V11C16 11.3804 15.9579 11.7485 15.8789 12.1009L15.876 12.1136ZM7 21L13.3644 18.1071C15.6821 17.0536 17.3187 14.9677 17.8304 12.5386C17.9414 12.0435 18 11.5286 18 11V10C18 6.13401 14.866 3 11 3H7C3.13401 3 0 6.13401 0 10V11C0 14.866 3.13401 18 7 18V21Z"
                        fill="white"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                  <div className="bMiddle">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.39583 21L1.3125 16.8L5.39583 12.6V15.75H15.6042V11.55H17.6458V16.8C17.6458 17.3799 17.1888 17.85 16.625 17.85H5.39583V21ZM5.39583 9.45H3.35417V4.2C3.35417 3.6201 3.81121 3.15 4.375 3.15H15.6042V0L19.6875 4.2L15.6042 8.4V5.25H5.39583V9.45Z"
                        fill="white"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                  <div className="bRight">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 18.375C9.93563 17.8745 9.29775 17.3539 8.62313 16.8H8.61438C6.23876 14.8575 3.54638 12.6595 2.35725 10.0258C1.96658 9.18727 1.75955 8.27499 1.74999 7.35001C1.74739 6.08081 2.25643 4.86412 3.16209 3.97493C4.06774 3.08574 5.29357 2.5991 6.5625 2.62501C7.59555 2.62664 8.60636 2.9252 9.4745 3.48513C9.85598 3.73273 10.2011 4.03223 10.5 4.37501C10.8006 4.03358 11.1458 3.73425 11.5264 3.48513C12.3941 2.92509 13.4047 2.62651 14.4375 2.62501C15.7064 2.5991 16.9323 3.08574 17.8379 3.97493C18.7436 4.86412 19.2526 6.08081 19.25 7.35001C19.2411 8.27647 19.034 9.1903 18.6428 10.0301C17.4536 12.6639 14.7621 14.861 12.3865 16.8L12.3778 16.807C11.7023 17.3574 11.0653 17.878 10.5009 18.382L10.5 18.375ZM6.5625 4.37501C5.74745 4.36481 4.96132 4.67675 4.375 5.24301C3.81009 5.7979 3.49436 6.55817 3.49993 7.35001C3.50992 8.0242 3.6626 8.68863 3.948 9.29951C4.50933 10.4359 5.26673 11.4643 6.18538 12.3375C7.0525 13.2125 8.05 14.0595 8.91275 14.7718C9.15163 14.9686 9.39488 15.1673 9.63813 15.3659L9.79125 15.491C10.0249 15.6818 10.2664 15.8795 10.5 16.0738L10.5114 16.0633L10.5166 16.0589H10.5219L10.5298 16.0528H10.5341H10.5385L10.5543 16.0396L10.5901 16.0108L10.5963 16.0055L10.6059 15.9985H10.6111L10.619 15.9915L11.2 15.5146L11.3523 15.3895C11.5981 15.1891 11.8414 14.9905 12.0803 14.7936C12.943 14.0814 13.9414 13.2353 14.8085 12.3559C15.7273 11.4831 16.4847 10.455 17.0459 9.31876C17.3364 8.70258 17.4913 8.0312 17.5 7.35001C17.5036 6.56062 17.1881 5.80326 16.625 5.25001C16.0398 4.68119 15.2535 4.36668 14.4375 4.37501C13.4417 4.36654 12.4897 4.78396 11.8213 5.52213L10.5 7.04463L9.17875 5.52213C8.51031 4.78396 7.55832 4.36654 6.5625 4.37501Z"
                        fill="white"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
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
                {userInfo?._id === post?.user._id && (
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
          <div>
            {results?.map((post) => (
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
          <Modal post={post!} showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
};

export default PostScreen;
