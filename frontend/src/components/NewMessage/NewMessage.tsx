import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deselectUser, getUsers, selectUser } from "../../actions/userActions";
import { reducerState } from "../../store";
import { ISelectedUser, IUsers } from "../../types";
import UserMessage from "../../components/UserMessage/UserMessage";
import SelectedUser from "../../components/SelectedUser/SelectedUser";
import "./newMessage.scss";
import { USER_SELECT_RESET } from "../../constants/userConstants";
import { createChat } from "../../actions/chatActions";

interface IModal {
  showModal?: boolean;
  setShowModal?: any;
}

const NewMessage: FunctionComponent<IModal> = ({ showModal, setShowModal }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");

  const usersList: IUsers = useSelector((state: reducerState) => state.usersList);
  const { users } = usersList;

  const userSelect: ISelectedUser = useSelector(
    (state: reducerState) => state.userSelect
  );
  const { selectedUser } = userSelect;

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [showModal, setShowModal]
  );

  useEffect(() => {
    dispatch({ type: USER_SELECT_RESET });
    dispatch(getUsers());

    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress, dispatch]);

  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === event.target) {
      setShowModal(false);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUsername(value);

    setTimeout(() => {
      if (value) {
        dispatch(getUsers(value));
      }
    }, 800);
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim()) {
      dispatch(getUsers(username));
    }
  };

  const userSelected = (userId: string) => {
    //Dispatch
    dispatch(selectUser(userId));
  };

  const userDeselect = (userId: string) => {
    //Dispatch
    dispatch(deselectUser(userId));
  };

  const clickHandler = () => {
    //Dispatch
    if (selectedUser) {
      dispatch(createChat(selectedUser));
    }
  };

  return (
    <>
      {showModal && (
        <div ref={modalRef} className="newMessageBg" onClick={closeModal}>
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
                  <p className="title">New message</p>
                </div>
                <div className="right">
                  <button
                    type="button"
                    onClick={clickHandler}
                    className={
                      username.trim().length === 0 && !selectedUser?.length
                        ? "submitButton disabled"
                        : "submitButton"
                    }
                    disabled={username.trim().length === 0 && !selectedUser?.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="modalSearch">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.37413 0.666687C4.01398 0.666687 0.583496 4.40842 0.583496 8.89162C0.583496 13.3748 4.01398 17.1166 8.37413 17.1166C12.7343 17.1166 16.1648 13.3748 16.1648 8.89162C16.1648 6.72955 15.3581 4.64451 13.9045 3.09796C12.4489 1.5493 10.461 0.666687 8.37413 0.666687ZM2.5835 8.89162C2.5835 5.39438 5.23355 2.66669 8.37413 2.66669C9.88919 2.66669 11.3557 3.30647 12.4472 4.46769C13.5406 5.63101 14.1648 7.22135 14.1648 8.89162C14.1648 12.3889 11.5147 15.1166 8.37413 15.1166C5.23355 15.1166 2.5835 12.3889 2.5835 8.89162ZM15.0524 14.7119L17.0748 16.4304H17.11C17.5191 16.8657 17.5191 17.5715 17.11 18.0068C16.7008 18.4422 16.0374 18.4422 15.6282 18.0068L13.9499 15.9821C13.7912 15.8138 13.702 15.5853 13.702 15.347C13.702 15.1087 13.7912 14.8801 13.9499 14.7119C14.2559 14.392 14.7464 14.392 15.0524 14.7119Z"
                    fill="#1A85C7"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search people"
                  className="textInput"
                  autoComplete="off"
                  maxLength={80}
                  onChange={inputHandler}
                />
              </div>
            </form>
            {selectedUser && (
              <div className="selectedUserCard">
                {selectedUser?.map((user) => (
                  <SelectedUser key={user?._id} user={user} onClick={userDeselect} />
                ))}
              </div>
            )}

            <div className="line"></div>
            <div className="usersWrap">
              <div>
                {users?.length &&
                  users.map((user, index) => (
                    <UserMessage key={index} user={user} onClick={userSelected} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewMessage;
