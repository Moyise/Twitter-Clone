import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { listAllPosts } from "../../actions/postActions";
import { followUser, getUsers } from "../../actions/userActions";
import Meta from "../../components/Meta";
import PostCard from "../../components/PostCard/PostCard";
import UserCard from "../../components/UserCard/UserCard";
import { POST_LIST_RESET } from "../../constants/postConstants";
import { reducerState } from "../../store";
import { IPosts, IUserAuth, IUsers } from "../../types";
import "./searchScreen.scss";

interface IParams {
  posts: string;
  keyword: string;
}

const SearchScreen = () => {
  const history = useHistory();
  const match = useRouteMatch<IParams>();
  const dispatch = useDispatch();

  const [toggleTab, setToggleTab] = useState(1);
  const [keyword, setKeyword] = useState("");

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const postList: IPosts = useSelector((state: reducerState) => state.postList);
  const { posts } = postList;

  const usersList: IUsers = useSelector((state: reducerState) => state.usersList);
  const { users } = usersList;

  const route = match.params.posts;
  const pathname = history.location.pathname;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch({ type: POST_LIST_RESET });
    if (match.params.keyword) {
      setKeyword(match.params.keyword);
      dispatch(listAllPosts(match.params.keyword));
    }

    if (route === "posts") {
      setToggleTab(1);
    } else {
      setToggleTab(2);
    }
  }, [dispatch, userInfo, history, route, match]);

  const followHandler = (userId: string) => {
    if (userInfo) {
      dispatch(followUser(userId, userInfo?._id));
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setKeyword(value);

    setTimeout(() => {
      if (value) {
        if (pathname === "/search/posts") {
          dispatch(listAllPosts(value));
        } else {
          dispatch(getUsers(value));
        }
      }
    }, 800);
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.trim()) {
      if (pathname === "/search/posts") {
        dispatch(listAllPosts(keyword));
      } else {
        dispatch(getUsers(keyword));
      }
    }
  };

  return (
    <>
      <Meta title="Explore" />
      <div className="searchScreen">
        <div className="searchContainer">
          <div className="searchTop">
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
                  onChange={inputHandler}
                />
              </div>
            </form>
            <div className="blockTabs">
              <div
                className={toggleTab === 1 ? "tabLeft active" : "tabLeft"}
                onClick={() => history.replace(`/search/posts`)}
              >
                <p>Tweets</p>
              </div>
              <div
                className={toggleTab === 2 ? "tabRight active" : "tabRight"}
                onClick={() => history.replace(`/search/users`)}
              >
                <p>Users</p>
              </div>
            </div>
          </div>

          <div className="tabsContent">
            <div className={toggleTab === 1 ? "content active" : "content"}>
              {posts?.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  liked={
                    post.likes.includes(userInfo?._id!) ||
                    post.retweetData?.likes.includes(userInfo?._id!)
                  }
                  retweeted={
                    post.retweetUsers.includes(userInfo?._id!) ||
                    post.retweetData?.retweetUsers.includes(userInfo?._id!)
                  }
                />
              ))}
            </div>
            <div className={toggleTab === 2 ? "content active" : "content"}>
              {users?.map((user) => (
                <UserCard key={user._id} follow={user} onClick={followHandler} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
