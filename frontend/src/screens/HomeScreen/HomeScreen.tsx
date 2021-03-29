import React, { useEffect, useRef, useState } from "react";
import "./homeScreen.scss";
import PostCard from "../../components/PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "../../store";
import { ICreatePost, IPostReply, IPosts, IUserAuth, IDelete } from "../../types";
import { useHistory } from "react-router";
import { createPost, listPosts } from "../../actions/postActions";
import { POST_CREATE_RESET } from "../../constants/postConstants";

const HomeScreen = () => {
  const history = useHistory();

  const textareaRef = useRef<any>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const postList: IPosts = useSelector((state: reducerState) => state.postList);
  const { posts, loading, error: postError } = postList;

  const postCreate: ICreatePost = useSelector((state: reducerState) => state.postCreate);
  const { success } = postCreate;

  const postReply: IPostReply = useSelector((state: reducerState) => state.postReply);
  const { success: replySuccess } = postReply;

  const postDelete: IDelete = useSelector((state: reducerState) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const dispatch = useDispatch();

  // const followingArr = userInfo?.following.map((user) => user._id);
  // console.log(followingArr);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [content]);

  useEffect(() => {
    if (success || replySuccess || deleteSuccess) {
      dispatch({ type: POST_CREATE_RESET });
      dispatch(listPosts());
      setContent("");
    }
  }, [success, dispatch, replySuccess, deleteSuccess]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    //dispatch posts
    dispatch(listPosts());
  }, [history, userInfo, dispatch]);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim()) {
      // Dispatch create post
      dispatch(createPost(content));
    } else {
      setError("Make sure your tweet has a valid value.");
    }
  };

  return (
    <>
      <div className="homeScreen">
        <div className="homeContainer">
          <p className="homeTitle">Home</p>
          <div className="newPost">
            <div className="left">
              <img src={userInfo?.profilePic} alt="profile" />
            </div>
            <div className="right">
              <form className="postForm" onSubmit={submitHandler}>
                <textarea
                  ref={textareaRef}
                  name="post"
                  value={content}
                  className="postTextarea"
                  placeholder="What’s happening?"
                  maxLength={280}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="buttonWrap">
                  <button
                    className={content.trim() ? "submitButton" : "submitButton disabled"}
                    type="submit"
                    disabled={content.trim().length === 0}
                  >
                    Tweet
                  </button>
                </div>
              </form>
              {error && <p className="errorMessage">{error}</p>}
              {postError && <p className="errorMessage">{postError}</p>}
            </div>
          </div>
          <div className="bar"></div>
          {loading ? (
            <div className="loading">
              <i
                className="fas fa-spinner fa-spin fa-2x"
                style={{ color: "rgba(0, 238, 255, 0.9)" }}
              ></i>
            </div>
          ) : error ? (
            <p className="errorMessage">{error}</p>
          ) : (
            <>
              {!posts?.length ? (
                <p className="empty">No Tweets were found</p>
              ) : (
                posts.map((post) => (
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
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
