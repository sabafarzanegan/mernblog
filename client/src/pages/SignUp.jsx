import React, { useState } from "react";
import { Alert, Spinner } from "flowbite-react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  SignUpSuccess,
  SignUpstart,
  SignUpfailed,
} from "../components/redux/UserSlice";

import { useSelector, useDispatch } from "react-redux";

function SignUp() {
  const [formData, setFormData] = useState({});

  const { error: errorMessage, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(SignUpstart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(SignUpfailed(data.massage));
      }

      if (res.ok) {
        navigate("/login");
        dispatch(SignUpSuccess(data));
      }
    } catch (error) {
      dispatch(SignUpfailed(error.massage));
    }
  };

  return (
    <>
      <h1 className="text-center font-lale text-3xl mt-10 mb-5 dark:text-gray-200">
        ثبت نام
      </h1>
      <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 m-auto  dark:bg-gray-900 text-white">
        <h2 className="text-2xl font-bold pb-5 text-gray-700 dark:text-gray-200 text-center">
          SignUp
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              for="username"
              className="block mb-2 text-sm font-vazir text-right font-medium text-gray-600 dark:text-gray-200">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2  w-full py-2.5 px-4"
              placeholder="enter your username"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              for="email"
              className="block mb-2 text-sm font-vazir text-right font-medium text-gray-600 dark:text-gray-200">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full py-2.5 px-4"
              placeholder="....@mail.com"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              for="password"
              className="block mb-2 text-sm font-vazir text-right font-medium text-gray-600 dark:text-gray-200">
              رمز
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full py-2.5 px-4"
              placeholder="*********"
              required
              onChange={changeHandler}
            />
          </div>
          <div>
            <p className="text-red-500 pb-5"></p>
          </div>
          <div className="md:flex items-center justify-between mb-4 ">
            <button
              disabled={loading}
              type="submit"
              className="text-white mb-2   bg-purple-600 hover:bg-purple-700 font-vazir  font-medium rounded-lg text-sm py-2.5 px-5 w-full md:w-auto">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">در حال ارسال...</span>
                </>
              ) : (
                "ثبت نام"
              )}
            </button>

            <div className="flex items-center text-sm text-gray-800 font-vazir dark:text-gray-200">
              <p>حساب کاربری دارید؟</p>
              <Link to="/login" className=" cursor-pointer mr-2 font-bold">
                ورود
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

export default SignUp;
