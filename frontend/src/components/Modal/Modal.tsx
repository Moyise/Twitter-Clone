import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyToPost } from "../../actions/postActions";
import { reducerState } from "../../store";
import { timeDifference } from "../../timeFunction";
import { IPost, IUserAuth } from "../../types";
import "./modal.scss";

const Modal: FunctionComponent<IPost> = ({ post, showModal, setShowModal }) => {
  const textareaRef = useRef<any>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [showModal, setShowModal]
  );

  useEffect(() => {
    if (showModal) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [content, showModal, keyPress]);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim()) {
      // Dispatch comment
      dispatch(replyToPost(post._id, content));
    } else {
      setError("Make sure your tweet has a valid value.");
    }
  };

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div ref={modalRef} className="modalBackground" onClick={closeModal}>
          <div className="modal">
            <div className="modalTop">
              <svg
                onClick={() => setShowModal(!showModal)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
                  fill="#1A91DA"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <div className="modalMiddle">
              <div className="left">
                <img src={post.user.profilePic} alt="profile" />
                <div className="line"></div>
              </div>
              <div className="right">
                <div className="middleTop">
                  <p className="name">{post.user.firstName}</p>
                  <p className="at">
                    <span>@{post.user.username}</span>
                    <span>.</span>
                    <span>{timeDifference(new Date(), new Date(post.createdAt))}</span>
                  </p>
                </div>
                <p className="middleBottom">{post.content || post.retweetData.content}</p>
                <p className="userProfile">
                  Replying to <span>@{post.user.username}</span>
                </p>
              </div>
            </div>
            <div className="modalBottom">
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
                    placeholder="Tweet your reply"
                    maxLength={280}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="buttonWrap">
                    <button
                      className={
                        content.trim() ? "submitButton" : "submitButton disabled"
                      }
                      type="submit"
                      disabled={content.trim().length === 0}
                    >
                      Reply
                    </button>
                  </div>
                </form>
                {error && <p className="errorMessage">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
