import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userActions";
import { reducerState } from "../../store";
import { IUserAuth } from "../../types";
import "./signupScreen.scss";

const SignupScreen = () => {
  const history = useHistory();

  const [eyeOpen1, setEyeOpen1] = useState(false);
  const [eyeOpen2, setEyeOpen2] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister: IUserAuth = useSelector(
    (state: reducerState) => state.userRegister
  );
  const { userInfo, loading, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const handleEye1 = () => {
    setEyeOpen1(!eyeOpen1);
  };
  const handleEye2 = () => {
    setEyeOpen2(!eyeOpen2);
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() && firstName.trim() && lastName.trim() && username.trim()) {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        //DISPATCH_SIGNUP
        dispatch(register(firstName, lastName, username, email.toLowerCase(), password));
      }
    } else {
      setMessage("Make sure each field has a valid value.");
    }
  };

  return (
    <div>
      <div className="signupScreen">
        <div className="signupBackground">
          <div className="signupContainer">
            <div className="signupLogo">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M49.9875 16.72C52.2286 15.3802 53.9055 13.2706 54.705 10.785C52.5992 12.0345 50.2951 12.9147 47.8925 13.3875C44.5615 9.86379 39.2838 9.00629 35.0085 11.2941C30.7333 13.5819 28.5188 18.4487 29.6025 23.175C20.9766 22.7419 12.94 18.6673 7.49254 11.965C4.64964 16.8685 6.10242 23.1369 10.8125 26.29C9.10931 26.2352 7.44386 25.7741 5.95504 24.945C5.95504 24.99 5.95504 25.035 5.95504 25.08C5.95602 30.1879 9.55597 34.5877 14.5625 35.6C12.9827 36.0298 11.3256 36.0931 9.71754 35.785C11.1255 40.1531 15.1514 43.1457 19.74 43.235C15.9396 46.2178 11.2462 47.8354 6.41504 47.8275C5.55872 47.8287 4.70306 47.7795 3.85254 47.68C8.75851 50.8325 14.4685 52.5059 20.3 52.5C28.4132 52.5557 36.2101 49.3572 41.9469 43.62C47.6836 37.8828 50.8814 30.0856 50.825 21.9725C50.825 21.5075 50.8142 21.045 50.7925 20.585C52.8937 19.0665 54.7071 17.1853 56.1475 15.03C54.1901 15.8976 52.1137 16.4673 49.9875 16.72Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <h1 className="signupTitle">Create your account</h1>
            <form className="signupForm" onSubmit={submitHandler}>
              <div className="signupFormGroup">
                <label className="formLabel">First name</label>
                <div className="formInputWrap">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Last name</label>
                <div className="formInputWrap">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Username</label>
                <div className="formInputWrap">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Email</label>
                <div className="formInputWrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Password</label>
                <div className="formInputWrap">
                  <input
                    type={eyeOpen1 ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="formInput"
                    required
                  />
                  <div className="imageWrap" onClick={handleEye1}>
                    {eyeOpen1 ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4.40002C3.439 4.40002 0 9.23202 0 10C0 10.766 3.439 15.6 10 15.6C16.56 15.6 20 10.766 20 10C20 9.23202 16.56 4.40002 10 4.40002ZM10 14.307C7.545 14.307 5.555 12.379 5.555 10C5.555 7.62102 7.545 5.69102 10 5.69102C12.455 5.69102 14.444 7.62102 14.444 10C14.444 12.379 12.455 14.307 10 14.307ZM10 10C9.593 9.55302 10.663 7.84602 10 7.84602C8.772 7.84602 7.777 8.81102 7.777 10C7.777 11.189 8.772 12.154 10 12.154C11.227 12.154 12.223 11.189 12.223 10C12.223 9.45302 10.346 10.379 10 10Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8417 11.1584C16.3087 9.9534 17.2597 8.23327 17.5 6.35008C17.5131 6.24064 17.5046 6.12969 17.4748 6.02356C17.4451 5.91743 17.3947 5.8182 17.3266 5.73153C17.2585 5.64487 17.174 5.57246 17.078 5.51845C16.9819 5.46444 16.8761 5.42988 16.7667 5.41675C16.6572 5.40361 16.5463 5.41216 16.4401 5.44191C16.334 5.47166 16.2348 5.52202 16.1481 5.59011C16.0615 5.65821 15.989 5.74271 15.935 5.83879C15.881 5.93487 15.8465 6.04064 15.8333 6.15008C15.6341 7.55532 14.9343 8.8414 13.8626 9.77189C12.7909 10.7024 11.4193 11.2147 10 11.2147C8.58071 11.2147 7.20912 10.7024 6.13741 9.77189C5.06569 8.8414 4.36589 7.55532 4.16666 6.15008C4.15353 6.04064 4.11897 5.93487 4.06496 5.83879C4.01095 5.74271 3.93854 5.65821 3.85188 5.59011C3.76521 5.52202 3.66598 5.47166 3.55985 5.44191C3.45372 5.41216 3.34277 5.40361 3.23333 5.41675C3.1239 5.42988 3.01812 5.46444 2.92204 5.51845C2.82596 5.57246 2.74146 5.64487 2.67336 5.73153C2.60527 5.8182 2.55491 5.91743 2.52516 6.02356C2.49542 6.12969 2.48686 6.24064 2.5 6.35008C2.73819 8.23203 3.6861 9.95198 5.15 11.1584L3.23333 13.0917C3.09681 13.2512 3.02547 13.4562 3.03357 13.666C3.04167 13.8757 3.12862 14.0746 3.27703 14.223C3.42544 14.3715 3.62439 14.4584 3.83412 14.4665C4.04385 14.4746 4.24891 14.4033 4.40833 14.2667L6.58333 12.1001C7.3915 12.5085 8.26655 12.7682 9.16666 12.8667V15.8334C9.16666 16.0544 9.25446 16.2664 9.41074 16.4227C9.56702 16.5789 9.77898 16.6667 10 16.6667C10.221 16.6667 10.433 16.5789 10.5893 16.4227C10.7455 16.2664 10.8333 16.0544 10.8333 15.8334V12.8667C11.7335 12.7682 12.6085 12.5085 13.4167 12.1001L15.5917 14.2667C15.7511 14.4033 15.9561 14.4746 16.1659 14.4665C16.3756 14.4584 16.5746 14.3715 16.723 14.223C16.8714 14.0746 16.9583 13.8757 16.9664 13.666C16.9745 13.4562 16.9032 13.2512 16.7667 13.0917L14.8417 11.1584Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Confirm password</label>
                <div className="formInputWrap">
                  <input
                    type={eyeOpen2 ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="formInput"
                    required
                  />
                  <div className="imageWrap" onClick={handleEye2}>
                    {eyeOpen2 ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4.40002C3.439 4.40002 0 9.23202 0 10C0 10.766 3.439 15.6 10 15.6C16.56 15.6 20 10.766 20 10C20 9.23202 16.56 4.40002 10 4.40002ZM10 14.307C7.545 14.307 5.555 12.379 5.555 10C5.555 7.62102 7.545 5.69102 10 5.69102C12.455 5.69102 14.444 7.62102 14.444 10C14.444 12.379 12.455 14.307 10 14.307ZM10 10C9.593 9.55302 10.663 7.84602 10 7.84602C8.772 7.84602 7.777 8.81102 7.777 10C7.777 11.189 8.772 12.154 10 12.154C11.227 12.154 12.223 11.189 12.223 10C12.223 9.45302 10.346 10.379 10 10Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8417 11.1584C16.3087 9.9534 17.2597 8.23327 17.5 6.35008C17.5131 6.24064 17.5046 6.12969 17.4748 6.02356C17.4451 5.91743 17.3947 5.8182 17.3266 5.73153C17.2585 5.64487 17.174 5.57246 17.078 5.51845C16.9819 5.46444 16.8761 5.42988 16.7667 5.41675C16.6572 5.40361 16.5463 5.41216 16.4401 5.44191C16.334 5.47166 16.2348 5.52202 16.1481 5.59011C16.0615 5.65821 15.989 5.74271 15.935 5.83879C15.881 5.93487 15.8465 6.04064 15.8333 6.15008C15.6341 7.55532 14.9343 8.8414 13.8626 9.77189C12.7909 10.7024 11.4193 11.2147 10 11.2147C8.58071 11.2147 7.20912 10.7024 6.13741 9.77189C5.06569 8.8414 4.36589 7.55532 4.16666 6.15008C4.15353 6.04064 4.11897 5.93487 4.06496 5.83879C4.01095 5.74271 3.93854 5.65821 3.85188 5.59011C3.76521 5.52202 3.66598 5.47166 3.55985 5.44191C3.45372 5.41216 3.34277 5.40361 3.23333 5.41675C3.1239 5.42988 3.01812 5.46444 2.92204 5.51845C2.82596 5.57246 2.74146 5.64487 2.67336 5.73153C2.60527 5.8182 2.55491 5.91743 2.52516 6.02356C2.49542 6.12969 2.48686 6.24064 2.5 6.35008C2.73819 8.23203 3.6861 9.95198 5.15 11.1584L3.23333 13.0917C3.09681 13.2512 3.02547 13.4562 3.03357 13.666C3.04167 13.8757 3.12862 14.0746 3.27703 14.223C3.42544 14.3715 3.62439 14.4584 3.83412 14.4665C4.04385 14.4746 4.24891 14.4033 4.40833 14.2667L6.58333 12.1001C7.3915 12.5085 8.26655 12.7682 9.16666 12.8667V15.8334C9.16666 16.0544 9.25446 16.2664 9.41074 16.4227C9.56702 16.5789 9.77898 16.6667 10 16.6667C10.221 16.6667 10.433 16.5789 10.5893 16.4227C10.7455 16.2664 10.8333 16.0544 10.8333 15.8334V12.8667C11.7335 12.7682 12.6085 12.5085 13.4167 12.1001L15.5917 14.2667C15.7511 14.4033 15.9561 14.4746 16.1659 14.4665C16.3756 14.4584 16.5746 14.3715 16.723 14.223C16.8714 14.0746 16.9583 13.8757 16.9664 13.666C16.9745 13.4562 16.9032 13.2512 16.7667 13.0917L14.8417 11.1584Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              {message && <p className="errorMessage">{message}</p>}
              {error && <p className="errorMessage">{error}</p>}
              {loading && (
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ color: "rgba(0, 238, 255, 0.9)" }}
                ></i>
              )}
              <button type="submit" className="formSubmit">
                Sign up
              </button>
            </form>
            <p className="bottomLinks">
              <span>Already have an account?</span>
              <Link to="/login" className="link">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
