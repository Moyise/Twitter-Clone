import React, { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { leaveGroupChat } from "../../actions/chatActions";
import { CHAT_GROUP_LEAVE_RESET } from "../../constants/chatConstants";
import { reducerState } from "../../store";
import { IMessageCreate } from "../../types";
import "./leaveCard.scss";

interface IModal {
  leaveModal?: boolean;
  setLeaveModal?: any;
  chatId: string;
}

const LeaveCard: FunctionComponent<IModal> = ({ leaveModal, setLeaveModal, chatId }) => {
  const newRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const chatGroupLeave: IMessageCreate = useSelector(
    (state: reducerState) => state.chatGroupLeave
  );
  const { success } = chatGroupLeave;

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && leaveModal) {
        setLeaveModal(false);
      }
    },
    [leaveModal, setLeaveModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    if (success) {
      setLeaveModal(false);
      dispatch({ type: CHAT_GROUP_LEAVE_RESET });
      history.push(`/messages`);
    }
  }, [success, history, setLeaveModal, dispatch]);

  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (newRef.current === event.target) {
      setLeaveModal(false);
    }
  };

  const clickHandler = () => {
    //Dispatch

    dispatch(leaveGroupChat(chatId));
  };

  return (
    <>
      {leaveModal && (
        <div ref={newRef} className="leaveConversation" onClick={closeModal}>
          <div className="modal">
            <div className="title">Leave conversation?</div>
            <p className="desc">
              This conversation will be deleted from your inbox. Other people in the
              conversation will still be able to see it.
            </p>
            <div className="buttons">
              <button className="cancel" onClick={() => setLeaveModal(false)}>
                Cancel
              </button>
              <button className="leave" onClick={clickHandler}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveCard;
