import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { detailsUser, followUser } from "../../actions/userActions";
import UserCard from "../../components/UserCard/UserCard";
import { reducerState } from "../../store";
import { IUser, IUserAuth } from "../../types";
import "./followsScreen.scss";

interface IParams {
  id: string;
  follows: string;
}

const FollowsScreen = () => {
  const match = useRouteMatch<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();

  const [toggleTab, setToggleTab] = useState(1);

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails: IUser = useSelector((state: reducerState) => state.userDetails);
  const { user } = userDetails;

  const id = match.params.id;
  const route = match.params.follows;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (route === "followers") {
      setToggleTab(1);
    } else {
      setToggleTab(2);
    }

    dispatch(detailsUser(id));
  }, [dispatch, userInfo, history, id, route]);

  const followHandler = (userId: string) => {
    if (userInfo) {
      dispatch(followUser(userId, userInfo?._id));
    }
  };

  return (
    <>
      <div className="followsScreen">
        <div className="followsContainer">
          <div className="topDetails">
            <div className="icon" onClick={() => history.push(`/profile/${id}`)}>
              <svg
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
            </div>
            <p className="title">
              <span className="username">{user?.firstName}</span>
              <span className="tweets">@{user?.username}</span>
            </p>
          </div>
          <div className="blockTabs">
            <div
              className={toggleTab === 1 ? "tabLeft active" : "tabLeft"}
              onClick={() => history.replace(`/profile/${id}/followers`)}
            >
              <p>Followers</p>
            </div>
            <div
              className={toggleTab === 2 ? "tabRight active" : "tabRight"}
              onClick={() => history.replace(`/profile/${id}/following`)}
            >
              <p>Following</p>
            </div>
          </div>
          <div className="tabsContent">
            <div className={toggleTab === 1 ? "content active" : "content"}>
              {user?.followers.map((follow, index) => (
                <UserCard key={index} follow={follow} onClick={followHandler} />
              ))}
            </div>
            <div className={toggleTab === 2 ? "content active" : "content"}>
              {user?.following.map((follow, index) => (
                <UserCard key={index} follow={follow} onClick={followHandler} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowsScreen;
