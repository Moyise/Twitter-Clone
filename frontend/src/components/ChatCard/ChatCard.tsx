import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { reducerState } from "../../store";
import { Link } from "react-router-dom";
import { postDate } from "../../timeFunction";
import { IChat, IUserAuth } from "../../types";
import "./chatCard.scss";

const ChatCard: FunctionComponent<IChat> = ({ chat }) => {
  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  function getChatName(chat: any) {
    let chatName = chat?.chatName;
    if (!chatName) {
      const otherChatUsers = getOtherChatUsers(chat?.users!);
      const nameArray = otherChatUsers.map(
        (user: any) => user.firstName + " " + user.lastName
      );
      chatName = nameArray.join(", ");
    }

    return chatName;
  }

  function getOtherChatUsers(users: any) {
    if (users.length === 1) return users;

    return users.filter((user: any) => user._id !== userInfo?._id);
  }

  function getChatImageElements(chat: any) {
    const otherChatUsers = getOtherChatUsers(chat?.users!);
    const usersImage = otherChatUsers.map((user: any) => user.profilePic);
    return usersImage;
  }

  function getChatUserId(chat: any) {
    const otherChatUsers = getOtherChatUsers(chat?.users!);
    const usersId = otherChatUsers.map((user: any) => user._id);
    return usersId;
  }

  return (
    <>
      {chat && (
        <div className="chatCard">
          <div className="left">
            {getChatImageElements(chat).length > 1 ? (
              getChatImageElements(chat)
                .slice(0, 2)
                .map((image: any, index: number) => (
                  <Link
                    to={`/messages/${chat?._id}/participants`}
                    key={index}
                    className="linkCtn"
                  >
                    <img src={image} alt="profile" className="groupChat" />
                  </Link>
                ))
            ) : (
              <Link to={`/profile/${getChatUserId(chat)}`}>
                <img className="profile" src={getChatImageElements(chat)} alt="profile" />
              </Link>
            )}
          </div>
          <Link to={`/messages/${chat?._id}`} className="middle">
            <p className="chatName">
              <span>{getChatName(chat).substring(0, 26)}</span>
              {getChatName(chat).length > 26 && <span>...</span>}
            </p>
            {chat.latestMessage && (
              <p className="lastMessage">
                {chat.latestMessage.sender.firstName}:{" "}
                {chat.latestMessage.content.substring(0, 22)}
                {chat.latestMessage.content.length > 22 && "..."}
              </p>
            )}
          </Link>
          <Link to={`/messages/${chat?._id}`} className="right">
            <p className="date">
              {chat?.createdAt && postDate(new Date(chat?.updatedAt))}
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default ChatCard;
