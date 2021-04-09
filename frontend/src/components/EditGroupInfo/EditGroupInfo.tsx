import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getChatsById, updateGroupName } from "../../actions/chatActions";
import { reducerState } from "../../store";
import { IChat, IChatGroupName, IUserAuth } from "../../types";
import "./editGroupInfo.scss";

interface IParams {
  id: string;
}

const EditGroupInfo: FunctionComponent<IChat> = ({
  chat,
  showModal,
  setShowModal,
  name,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const match = useRouteMatch<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const chatId = match.params.id;

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const chatGroupName: IChatGroupName = useSelector(
    (state: reducerState) => state.chatGroupName
  );
  const { success } = chatGroupName;

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [showModal, setShowModal]
  );

  useEffect(() => {
    if (success) {
      setShowModal(false);
    }

    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress, setShowModal, dispatch, success]);

  useEffect(() => {
    if (!chat?.chatName && name) {
      setGroupName(name);
    } else if (chat?.chatName) {
      setGroupName(chat.chatName);
    }
  }, [chat, name]);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (groupName.trim() && chat) {
      //DISPATCH_UPDATE Chat name
      dispatch(updateGroupName(chat._id, groupName));
    } else {
      setError("Enter a valid name.");
    }
  };

  return (
    <>
      {showModal && (
        <div ref={modalRef} className="editGroupInfo" onClick={closeModal}>
          <div className="modal">
            <form className="modalForm" onSubmit={submitHandler}>
              <div className="modalTop">
                <div className="left">
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
                  <p className="title">Edit</p>
                </div>
                <div className="right">
                  <button
                    type="submit"
                    className={
                      groupName.trim() ? "submitButton" : "submitButton disabled"
                    }
                    disabled={groupName.trim().length === 0}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="modalBottom">
                <div className="form">
                  <div className="formGroup">
                    <label>Group name</label>
                    <input
                      className="formInput"
                      type="text"
                      name="name"
                      value={groupName}
                      maxLength={50}
                      autoComplete="off"
                      required
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>

                  <p className="errorMessage">{error}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditGroupInfo;
