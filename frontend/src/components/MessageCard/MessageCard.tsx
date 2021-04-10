import React, { FunctionComponent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reducerState } from "../../store";
import { postDate, postTime } from "../../timeFunction";
import { IMessage, IUserAuth } from "../../types";
import "./messageCard.scss";

const MessageCard: FunctionComponent<IMessage> = ({ message, isGroupChat, index }) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const isMine = message.sender._id === userInfo?._id;

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div ref={messageRef} className="messageCard">
        <div className={isMine ? "messageCardCtn mine" : "messageCardCtn theirs"}>
          {!isMine && (
            <Link to={`/profile/${message.sender._id}`} className="left">
              <img className="profile" src={message.sender.profilePic} alt="profile" />
            </Link>
          )}
          <div className="middle">
            <div className="top">
              <p className="content">{message.content}</p>
            </div>

            <div className="bottom">
              {!isMine && isGroupChat && (
                <p className="date">{message.sender.firstName}</p>
              )}
              {!isMine && isGroupChat && <p className="date">.</p>}
              <p className="date">
                {postDate(new Date(message.createdAt))},{" "}
                {postTime(new Date(message.createdAt))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
