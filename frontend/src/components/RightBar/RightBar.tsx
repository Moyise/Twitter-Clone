import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { followUser, getUsers } from "../../actions/userActions";
import { reducerState } from "../../store";
import { IUserAuth, IUsers } from "../../types";
import UsersCard from "../UsersCard/UsersCard";
import "./rightBar.scss";

const RightBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = history.location.pathname;

  const [keyword, setKeyword] = useState("");

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const usersList: IUsers = useSelector((state: reducerState) => state.usersList);
  const { users } = usersList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, pathname]);

  const followHandler = (userId: string) => {
    if (userInfo) {
      dispatch(followUser(userId, userInfo?._id));
    }
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}/posts`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <div className="rightBar">
        <div className="rightBarContainer">
          {history.location.pathname !== `/search/${keyword}/posts` &&
            history.location.pathname !== `/search/posts` &&
            history.location.pathname !== `/search/${keyword}/users` &&
            history.location.pathname !== `/search/users` && (
              <form className="searchForm" onSubmit={submitHandler}>
                <div className="searchWrap">
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
                      d="M8.37398 0.666687C4.01383 0.666687 0.583344 4.40842 0.583344 8.89162C0.583344 13.3748 4.01383 17.1166 8.37398 17.1166C12.7341 17.1166 16.1646 13.3748 16.1646 8.89162C16.1646 6.72955 15.3579 4.64451 13.9043 3.09796C12.4488 1.5493 10.4609 0.666687 8.37398 0.666687ZM2.58334 8.89162C2.58334 5.39438 5.2334 2.66669 8.37398 2.66669C9.88904 2.66669 11.3556 3.30647 12.447 4.46769C13.5404 5.63101 14.1646 7.22135 14.1646 8.89162C14.1646 12.3889 11.5146 15.1166 8.37398 15.1166C5.2334 15.1166 2.58334 12.3889 2.58334 8.89162ZM15.0522 14.7119L17.0747 16.4304H17.1098C17.519 16.8657 17.519 17.5715 17.1098 18.0068C16.7006 18.4422 16.0372 18.4422 15.6281 18.0068L13.9497 15.9821C13.7911 15.8138 13.7019 15.5853 13.7019 15.347C13.7019 15.1087 13.7911 14.8801 13.9497 14.7119C14.2557 14.392 14.7462 14.392 15.0522 14.7119Z"
                      fill="white"
                      fillOpacity="0.3"
                    />
                  </svg>
                  <input
                    className="inputForm"
                    type="text"
                    name="q"
                    placeholder="Search Twitter"
                    autoComplete="off"
                    maxLength={80}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </form>
            )}

          <div className="usersWrap">
            <div className="title">Who to follow</div>
            <div>
              {users?.length &&
                users
                  .slice(0, 3)
                  .map((user, index) => (
                    <UsersCard key={index} user={user} onClick={followHandler} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
