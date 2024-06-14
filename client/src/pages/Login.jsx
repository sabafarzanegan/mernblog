import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Spinner } from "flowbite-react";

import {
  LoginStart,
  LoginSuccess,
  LoginFailed,
} from "../components/redux/UserSlice";

function Login() {
  const [formData, setFormData] = useState({});
  const {
    error: errorMessage,
    currentUser,
    loading,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(LoginStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(LoginFailed(data.message));
      }

      if (res.ok) {
        dispatch(LoginSuccess(data));

        navigate("/");
      }
    } catch (error) {
      dispatch(LoginFailed(error.message));
    }
  };

  return (
    <>
      <h1 className="text-center font-lale text-3xl mt-10 mb-5 dark:text-gray-200">
        ورود
      </h1>
      <div class="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 m-auto  dark:bg-gray-900 text-white">
        <h2 class="text-2xl font-bold pb-5 text-gray-700 dark:text-gray-200 text-center">
          SignUp
        </h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label
              for="email"
              class="block mb-2 text-sm font-vazir text-right font-medium text-gray-600 dark:text-gray-200">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full py-2.5 px-4"
              placeholder="....@mail.com"
              required
              onChange={changeHandler}
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block mb-2 text-sm font-vazir text-right font-medium text-gray-600 dark:text-gray-200">
              رمز
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full py-2.5 px-4"
              placeholder="*********"
              required
              onChange={changeHandler}
            />
          </div>
          <div>
            <p class="text-red-500 pb-5"></p>
          </div>
          <div class="md:flex items-center justify-between mb-4">
            <button
              type="submit"
              className="text-white mb-2 bg-purple-600 hover:bg-purple-700 font-vazir  font-medium rounded-lg text-sm py-2.5 px-5 w-full md:w-auto">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">در حال ارسال...</span>
                </>
              ) : (
                "ورود"
              )}
            </button>
            <div class="flex items-center text-sm text-gray-800 font-vazir dark:text-gray-200">
              <p>حساب کاربری ندارید؟</p>
              <Link to="/signup" class=" cursor-pointer mr-2 font-bold">
                ثبت نام
              </Link>
            </div>
          </div>
        </form>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </>
  );
}

export default Login;
