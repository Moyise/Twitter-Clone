import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import { reducerState } from "../../store";
import { IUserAuth, IUser, IProfileUpdate } from "../../types";
import "./editProfile.scss";
import { updateProfile } from "../../actions/userActions";

const EditProfile: FunctionComponent<IUser> = ({ user, showModal, setShowModal }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate: IProfileUpdate = useSelector(
    (state: reducerState) => state.userProfileUpdate
  );
  const { success } = userProfileUpdate;

  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [profileUpload, setProfileUpload] = useState(false);
  const [coverUpload, setCoverUpload] = useState(false);

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [showModal, setShowModal]
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (user) {
      setName(user?.firstName);
      setProfilePic(user.profilePic);
      setCoverPic(user.coverPic);
      setBio(user.bio);
      setWebsite(user.website);
    }

    if (success) {
      setShowModal(false);
    }

    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress, userInfo, history, user, success, setShowModal]);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const uploadProfilePicHandler = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    setProfileUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setProfilePic(data);
      setProfileUpload(false);
    } catch (error) {
      setProfileUpload(false);
    }
  };

  const uploadCoverPicHandler = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    setCoverUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setCoverPic(data);
      setCoverUpload(false);
    } catch (error) {
      setCoverUpload(false);
    }
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim()) {
      //DISPATCH_UPDATE PROFILE
      dispatch(
        updateProfile({ id: user?._id, name, bio, website, profilePic, coverPic })
      );
    } else {
      setError("Make sure each field has a valid value.");
    }
  };

  return (
    <>
      {showModal && (
        <div ref={modalRef} className="editProfileBackground" onClick={closeModal}>
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
                  <p className="title">Edit Profile</p>
                </div>
                <div className="right">
                  <button type="submit" className="submitButton">
                    Save
                  </button>
                </div>
              </div>
              <div className="modalBottom">
                <div className="userCover">
                  <img src={coverPic} alt="cover" className="coverImg" />
                  <div className="coverPicWrapper">
                    <input
                      type="file"
                      id="coverFile"
                      accept="image/*"
                      name="coverPic"
                      onChange={uploadCoverPicHandler}
                    />
                    {coverUpload ? (
                      <i className="fas fa-spinner fa-spin fa-2x"></i>
                    ) : (
                      <label htmlFor="coverFile">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 5H17.414L14.707 2.293C14.6143 2.19996 14.5041 2.12617 14.3828 2.07589C14.2614 2.0256 14.1313 1.99981 14 2H10C9.86866 1.99981 9.73857 2.0256 9.61724 2.07589C9.4959 2.12617 9.38571 2.19996 9.293 2.293L6.586 5H4C2.897 5 2 5.897 2 7V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V7C22 5.897 21.103 5 20 5ZM12 17C9.29 17 7 14.71 7 12C7 9.289 9.29 7 12 7C14.71 7 17 9.289 17 12C17 14.71 14.71 17 12 17Z"
                            fill="white"
                            fillOpacity="0.8"
                          />
                          <path
                            d="M13 9H11V11H9V13H11V15H13V13H15V11H13V9Z"
                            fill="white"
                            fillOpacity="0.8"
                          />
                        </svg>
                      </label>
                    )}

                    <div className="delete">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    </div>
                  </div>
                  <img src={profilePic} alt="profile" className="profilePic" />
                  <div className="profilePicWrapper">
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      name="profilePic"
                      onChange={uploadProfilePicHandler}
                    />
                    {profileUpload ? (
                      <i className="fas fa-spinner fa-spin fa-2x"></i>
                    ) : (
                      <label htmlFor="file">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 5H17.414L14.707 2.293C14.6143 2.19996 14.5041 2.12617 14.3828 2.07589C14.2614 2.0256 14.1313 1.99981 14 2H10C9.86866 1.99981 9.73857 2.0256 9.61724 2.07589C9.4959 2.12617 9.38571 2.19996 9.293 2.293L6.586 5H4C2.897 5 2 5.897 2 7V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V7C22 5.897 21.103 5 20 5ZM12 17C9.29 17 7 14.71 7 12C7 9.289 9.29 7 12 7C14.71 7 17 9.289 17 12C17 14.71 14.71 17 12 17Z"
                            fill="white"
                            fillOpacity="0.8"
                          />
                          <path
                            d="M13 9H11V11H9V13H11V15H13V13H15V11H13V9Z"
                            fill="white"
                            fillOpacity="0.8"
                          />
                        </svg>
                      </label>
                    )}
                  </div>
                </div>
                <div className="form">
                  <div className="formGroup">
                    <label>Name</label>
                    <input
                      className="formInput"
                      type="text"
                      name="name"
                      value={name}
                      maxLength={50}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="formGroup textarea">
                    <label>Bio</label>
                    <textarea
                      className="formTextarea"
                      name="bio"
                      value={bio}
                      maxLength={160}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <div className="formGroup">
                    <label>Website</label>
                    <input
                      className="formInput"
                      type="text"
                      name="website"
                      value={website}
                      maxLength={50}
                      onChange={(e) => setWebsite(e.target.value)}
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

export default EditProfile;
