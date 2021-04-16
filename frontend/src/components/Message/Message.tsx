import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { getChats, getChatsById, markAllMessagesAsRead } from "../../actions/chatActions";
import { createMessage, getMessagesByChat } from "../../actions/messageActions";
import { CHAT_DETAILS_RESET } from "../../constants/chatConstants";
import { MESSAGE_LIST_RESET } from "../../constants/messageConstants";
import { reducerState } from "../../store";
import { userDate } from "../../timeFunction";
import { IChat, IMessageCreate, IMessages, IUserAuth } from "../../types";
import { socket } from "../../service/socket";
import MessageCard from "../MessageCard/MessageCard";
import "./message.scss";

interface IParams {
  id: string;
}

const Message = () => {
  const history = useHistory();
  const match = useRouteMatch<IParams>();
  const dispatch = useDispatch();
  const chatId = match.params.id;
  const textareaRef = useRef<any>(null);

  const [content, setContent] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState<number>(new Date().getTime());
  const [connected, setConnected] = useState(false);
  //const [messageReceived, setMessageReceived] = useState(false);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const chatDetails: IChat = useSelector((state: reducerState) => state.chatDetails);
  const { chat, error } = chatDetails;

  const messageCreate: IMessageCreate = useSelector(
    (state: reducerState) => state.messageCreate
  );
  const { success, message } = messageCreate;

  const messageList: IMessages = useSelector((state: reducerState) => state.messageList);
  const { messages } = messageList;

  const users = chat?.users.filter((user) => user._id !== userInfo?._id);
  const userIds = users?.map((user) => user._id);
  const createdAt = users?.map((user) => user.createdAt);
  const images = users?.map((user) => user.profilePic);
  const username = users?.map((user) => user.username);
  const firstName = users?.map((user) => user.firstName);
  const bio = users?.map((user) => user.bio);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (userInfo) {
      socket.emit("setup", userInfo);
    }

    socket.emit("join_room", chatId);

    const typingHandler = () => {
      setTyping(true);
      setLastTypingTime(new Date().getTime());
      const timerLength = 2000;
      setTimeout(() => {
        const timeNow = new Date().getTime();

        const timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          setTyping(false);
        }
      }, timerLength);
    };
    const messageHandler = () => {
      setTyping(false);
      dispatch(getChats());
      dispatch(getMessagesByChat(chatId));
    };
    socket.on("connected", () => setConnected(true));
    socket.on("typing", typingHandler);
    //socket.on("message received", (newMessage: any) => console.log(newMessage));
    socket.on("message received", messageHandler);
    return () => {
      socket.off("typing", typingHandler);
      socket.off("connected", () => setConnected(true));
      socket.off("message received", messageHandler);
    };
  }, [chatId, lastTypingTime, typing, setTyping, userInfo, dispatch]);

  useEffect(() => {
    textareaRef.current.style.height = "32px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [content]);

  useEffect(() => {
    if (success) {
      setContent("");
      setTyping(false);
      dispatch({ type: MESSAGE_LIST_RESET });

      if (connected) {
        socket.emit("new message", message);
      }
    }

    dispatch(getChats());
    dispatch(getMessagesByChat(chatId));
    dispatch(markAllMessagesAsRead(chatId));
  }, [dispatch, success, chatId, message, connected]);

  useEffect(() => {
    dispatch({ type: CHAT_DETAILS_RESET });

    dispatch(getChatsById(chatId));
  }, [dispatch, chatId]);

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

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Dispatch submit message
    if (content.trim() && chat) {
      setTyping(false);
      dispatch(createMessage(content.trim(), chat._id));
    }
  };

  const keyPress = useCallback(
    (e: any) => {
      if (textareaRef.current?.contains(e.target)) {
        socket.emit("typing", chatId);
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        //Dispatch submit message
        if (content.trim() && chat) {
          dispatch(createMessage(content.trim(), chat._id));
        }
      }
    },
    [content, dispatch, chat, chatId]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", keyPress);
    return () => document.body.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      <div className="message">
        <div className="messageCtn">
          <div className="messageTop">
            {chat && (
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
                  {users?.length === 1 && <p className="bottom">@{username}</p>}
                </div>
                <Link to={`/messages/${chatId}/info`} className="right">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.99 22C6.46846 21.9945 1.99632 17.5149 2 11.9933C2.00368 6.47179 6.48179 1.99816 12.0033 2C17.5249 2.00184 22 6.47845 22 12C21.9967 17.5254 17.5154 22.0022 11.99 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.6845 16.444 4.10977 12.0425 4.08599C7.64111 4.06245 4.04732 7.59876 4 12V12.172ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                      fill="#1A91DA"
                    />
                  </svg>
                </Link>
              </>
            )}
          </div>

          <div className="messagesWrapper">
            {users?.length === 1 && (
              <div className="userDescription">
                <div className="userCtn">
                  <div className="user">
                    <p className="firstName">{firstName}</p>
                    <p className="username">@{username}</p>
                  </div>
                  <p className="description">{bio}</p>
                  <div className="join">
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
                    {createdAt && (
                      <p className="date">Joined {userDate(new Date(createdAt[0]))}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="messagesCtn">
              {messages &&
                messages.map((message, index) => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    isGroupChat={chat?.isGroupChat!}
                    index={index + 1}
                  />
                ))}
            </div>
          </div>

          {typing && (
            <div className="typingWrap">
              <img src="/images/dots.gif" alt="typing" className="typing" />
            </div>
          )}

          <div className="textInputCtn">
            <form className="textInput" onSubmit={submitHandler}>
              <div className="textareaWrap">
                <textarea
                  ref={textareaRef}
                  value={content}
                  name="message"
                  placeholder="Start a new message"
                  className="messageTextarea"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <button type="submit" className="icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.3361 10.9999H3.66675L1.8545 3.79036C1.8429 3.74846 1.83583 3.70544 1.83342 3.66203C1.81325 3.00111 2.54108 2.54278 3.17175 2.84528L20.1667 10.9999L3.17175 19.1546C2.54842 19.4544 1.82975 19.0089 1.83342 18.3599C1.83527 18.3019 1.84546 18.2444 1.86367 18.1894L4.12508 11.9166"
                    stroke="#1A91DA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
