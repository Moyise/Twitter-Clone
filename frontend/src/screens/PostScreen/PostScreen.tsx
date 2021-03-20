import React, { useEffect } from "react";
import "./postScreen.scss";
import profile from "../../img/profile.png";
import { useLocation, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { detailsPost, listPosts } from "../../actions/postActions";
import { reducerState } from "../../store";
import { IPostDetails, IPosts } from "../../types";

interface RouteParams {
  id: string;
}

const PostScreen = () => {
  const match = useRouteMatch<RouteParams>();
  const id = match.params.id;
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const postList: IPosts = useSelector((state: reducerState) => state.postList);
  const { posts } = postList;

  const results = posts.filter((post) => {
    return post.replyTo;
  });
  console.log(results);

  const postDetails: IPostDetails = useSelector(
    (state: reducerState) => state.postDetails
  );
  const { post } = postDetails;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(detailsPost(id));
    dispatch(listPosts());
  }, [dispatch, id, pathname]);

  return (
    <>
      <div className="postScreen">
        <div className="postContainer">
          <div className="title">Tweet</div>
          <div className="postDetails">
            <div className="left">
              <div className="top">
                <img src={profile} alt="profile" />
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
                    <span>11:34 AM</span>
                    <span>.</span>
                    <span>Mar 19, 2021</span>
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
                  <div className="bLeft">
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
          {/* {..} */}
        </div>
      </div>
    </>
  );
};

export default PostScreen;
