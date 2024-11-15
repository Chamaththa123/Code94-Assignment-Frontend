import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/authSlice";
import logo from "../../assets/images/logo.png";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States to manage alert messages, form errors
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });

  // Refs for accessing username and password inputs
  const usernameRef = useRef();
  const passwordRef = useRef();

  //  validate input fields
  const validate = (loginData) => {
    const errors = {};
    if (!loginData.username) {
      errors.username = "username is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return errors;
  };

   // Handler function for login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setShowAlert(false);

    const loginData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const validationErrors = validate(loginData);
    if (Object.keys(validationErrors).length === 0) {
      axiosClient
        .post("/users/login", loginData)
        .then(({ data }) => {
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
          navigate("/");
        })
        .catch(({ response }) => {
          setAlertMessage(
            response?.data?.error || "Invalid username or password"
          );
          setShowAlert(true);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-5">
      <form
        className="flex flex-col items-center w-full max-w-[90%] md:max-w-[487px] p-5 md:p-12   mb-20 bg-white"
        onSubmit={handleLogin}
      >
        <div className="w-[55%] hidden md:flex items-center justify-center ">
          <img src={logo} alt="Sign Up" />
        </div>

        <div className="flex flex-col justify-between w-full gap-4 mt-8 md:mt-10">
          <div className="w-full">
            <label
              htmlFor="username"
              className="font-satoshi text-[16px] md:text-[16px] font-semibold text-[#162427] opacity-80"
            >
              Username:
            </label>
            <input
              id="Username"
              type="text"
              ref={usernameRef}
              className="block rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset mt-3 ring-gray-300 placeholder:text-[12px] md:placeholder:text-[14px] placeholder-nunito font-semibold focus:ring-1 focus:ring-inset w-full bg-[#F1F4F9]"
            />
            {formErrors.username && (
              <span className="text-xs font-medium text-red-500 font-satoshi">
                {formErrors.username}
              </span>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="font-satoshi text-[16px] md:text-[16px] font-semibold text-[#162427] opacity-80"
            >
              Password
            </label>
            <input
              id="Password"
              type="password"
              ref={passwordRef}
              className="block rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset mt-3 ring-gray-300 placeholder:text-[12px] md:placeholder:text-[14px] placeholder-nunito font-semibold focus:ring-1 focus:ring-inset w-full bg-[#F1F4F9]"
            />
            {formErrors.password && (
              <span className="text-xs font-medium text-red-500 font-satoshi">
                {formErrors.password}
              </span>
            )}
          </div>
        </div>

        <button
          className="w-full max-w-[389px] h-[56px] bg-[#001EB9] flex justify-center p-3 text-white font-satoshi text-[16px] md:text-[20px] font-bold rounded-[10px] mt-8 cursor-pointer "
          type="submit"
        >
          Sign In
        </button>

        {showAlert && (
          <div className="mt-4 font-semibold text-red-500">{alertMessage}</div>
        )}
      </form>
    </div>
  );
};
