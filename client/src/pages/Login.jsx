import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center font-lale text-3xl mt-10 mb-5">ورود</h1>
      <div class="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 m-auto  dark:bg-gray-900 text-white">
        <h2 class="text-2xl font-bold pb-5">SignUp</h2>
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
          <div class="flex items-center justify-between mb-4">
            <button
              type="submit"
              class="text-white bg-purple-600 hover:bg-purple-700 font-vazir  font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto">
              ورود
            </button>
            <div class="flex items-center text-sm text-gray-800 font-vazir">
              <p class=" cursor-pointer mr-2 font-bold">ثبت نام</p>
              <p>حساب کاربری ندارید؟</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
