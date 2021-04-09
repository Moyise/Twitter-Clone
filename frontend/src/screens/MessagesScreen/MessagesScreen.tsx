import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reducerState } from "../../store";
import { IChat, IChatGroupName, IChats, IUserAuth } from "../../types";
import NewMessage from "../../components/NewMessage/NewMessage";
import ChatCard from "../../components/ChatCard/ChatCard";
import "./messagesScreen.scss";
import { getChats } from "../../actions/chatActions";

const MessagesScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  const [showModal, setShowModal] = useState(false);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const chatList: IChats = useSelector((state: reducerState) => state.chatList);
  const { chats } = chatList;

  const chatCreate: IChat = useSelector((state: reducerState) => state.chatCreate);
  const { success } = chatCreate;

  const chatGroupName: IChatGroupName = useSelector(
    (state: reducerState) => state.chatGroupName
  );
  const { success: chatNameSuccess } = chatGroupName;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch(getChats());
  }, [userInfo, history, dispatch, success, chatNameSuccess]);

  return (
    <>
      <div className="messagesScreen">
        <div className="messagesContainer">
          <div className="messageTop">
            <p className="title">Messages</p>
            <svg
              onClick={() => setShowModal(!showModal)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <div ref={ref} className="messageBottom">
            {chats?.map((chat) => (
              <ChatCard key={chat._id} chat={chat} />
            ))}
          </div>
        </div>
        <NewMessage showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default MessagesScreen;
