import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getChatsById } from "../../actions/chatActions";
import { followUser } from "../../actions/userActions";
import { reducerState } from "../../store";
import { IChat, IUserAuth } from "../../types";
import Meta from "../Meta";
import UserCard from "../UserCard/UserCard";
import "./participant.scss";

interface IParams {
  id: string;
}

const Participant = () => {
  const match = useRouteMatch<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const chatId = match.params.id;

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const chatDetails: IChat = useSelector((state: reducerState) => state.chatDetails);
  const { chat } = chatDetails;

  //const users = chat?.users.filter((user) => user._id !== userInfo?._id);

  useEffect(() => {
    dispatch(getChatsById(chatId));
  }, [dispatch, chatId]);

  const followHandler = (userId: string) => {
    if (userInfo) {
      dispatch(followUser(userId, userInfo?._id));
    }
  };

  return (
    <>
      <Meta title="Direct Messages" />
      <div className="participant">
        <div className="participantCtn">
          <div className="participantTop">
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
            <p className="title">People</p>
          </div>
          <div className="participantBottom">
            {chat &&
              chat.users?.map((user) => (
                <UserCard key={user._id} follow={user} onClick={followHandler} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Participant;
