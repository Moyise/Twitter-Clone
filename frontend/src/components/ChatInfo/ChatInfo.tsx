import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { getChatsById } from "../../actions/chatActions";
import { followUser } from "../../actions/userActions";
import { reducerState } from "../../store";
import { IChat, IChatGroupName, IUserAuth } from "../../types";
import UserCard from "../UserCard/UserCard";
import EditGroupInfo from "../EditGroupInfo/EditGroupInfo";
import "./chatInfo.scss";

interface IParams {
  id: string;
}

const ChatInfo = () => {
  const match = useRouteMatch<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const chatId = match.params.id;

  const [showModal, setShowModal] = useState(false);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const chatDetails: IChat = useSelector((state: reducerState) => state.chatDetails);
  const { chat } = chatDetails;

  const chatGroupName: IChatGroupName = useSelector(
    (state: reducerState) => state.chatGroupName
  );
  const { success } = chatGroupName;

  const users = chat?.users.filter((user) => user._id !== userInfo?._id);
  const userIds = users?.map((user) => user._id);
  const images = users?.map((user) => user.profilePic);
  const username = users?.map((user) => user.username);

  useEffect(() => {
    dispatch(getChatsById(chatId));
  }, [dispatch, chatId, success]);

  function getOtherChatUsers(users: any) {
    if (users?.length === 1) return users;

    return users?.filter((user: any) => user._id !== userInfo?._id);
  }

  function getChatName(chat: any) {
    let chatName = chat?.chatName;
    if (!chatName) {
      const otherChatUsers = getOtherChatUsers(chat?.users!);
      const nameArray = otherChatUsers?.map(
        (user: any) => user?.firstName + " " + user?.lastName
      );
      chatName = nameArray.join(", ");
    }

    return chatName;
  }

  const followHandler = (userId: string) => {
    if (userInfo) {
      dispatch(followUser(userId, userInfo?._id));
    }
  };

  return (
    <>
      <div className="chatInfo">
        <div className="chatInfoCtn">
          <div className="chatInfoTop">
            <svg
              onClick={() => history.push(`/messages/${chatId}`)}
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
            <p className="title">
              {chat?.isGroupChat ? "Group info" : "Conversation info"}
            </p>
          </div>
          <div className="chatInfoName">
            {chat && chat.isGroupChat ? (
              <>
                <div className="left">
                  {images && images.length > 1 ? (
                    images.slice(0, 3).map((image: any, index: number) => (
                      <Link
                        to={`/messages/${chat?._id}/participants`}
                        key={index}
                        className="linkCtn"
                      >
                        <img src={image} alt="profile" className="groupChat" />
                      </Link>
                    ))
                  ) : (
                    <Link to={`/profile/${userIds}`}>
                      <img className="profile" src={images![0]} alt="profile" />
                    </Link>
                  )}
                </div>
                {images && images?.length > 3 && (
                  <div className="number">
                    <p className="rest">+{images.length - 3}</p>
                  </div>
                )}

                <div className="middle">
                  <p className="top">
                    <span>{getChatName(chat).substring(0, 26)}</span>
                    {getChatName(chat).length > 26 && <span>...</span>}
                  </p>
                </div>
                <p className="right" onClick={() => setShowModal(!showModal)}>
                  Edit
                </p>
              </>
            ) : (
              images?.length === 1 && (
                <>
                  <div className="left">
                    {images ? (
                      images.slice(0, 3).map((image: any, index: number) => (
                        <Link
                          to={`/messages/${chat?._id}/participants`}
                          key={index}
                          className="linkCtn"
                        >
                          <img src={image} alt="profile" className="groupChat" />
                        </Link>
                      ))
                    ) : (
                      <Link to={`/profile/${userIds}`}>
                        <img className="profile" src={images![0]} alt="profile" />
                      </Link>
                    )}
                  </div>

                  <Link to={`/profile/${userIds}`} className="middle single">
                    <p className="top">
                      <span>{getChatName(chat).substring(0, 26)}</span>
                      {getChatName(chat).length > 26 && <span>...</span>}
                    </p>
                    <p className="bottom">@{username}</p>
                  </Link>
                </>
              )
            )}
          </div>
          <div className="bar"></div>
          {chat?.isGroupChat && (
            <>
              <div className="peoplesInfo">
                <p className="title">People</p>
                <div className="peoples">
                  {users?.map((user) => (
                    <UserCard key={user._id} follow={user} onClick={followHandler} />
                  ))}
                </div>
                <div className="addPeople">
                  <p className="button">Add people</p>
                </div>
              </div>
              <div className="bar"></div>
            </>
          )}
        </div>
        {chat && (
          <EditGroupInfo
            chat={chat}
            name={getChatName(chat)}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  );
};

export default ChatInfo;
