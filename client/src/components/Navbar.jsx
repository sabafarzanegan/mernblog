import React from "react";
import logo from "../asset/image/icons8-blog-64.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DropProfile from "./DropProfile";

function Navbar() {
  const [user, setUser] = useState(true);
  const [isShownav, setIsShownav] = useState(false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const parsedTheme = storedTheme === "dark" ? "dark" : "light";
    return parsedTheme;
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.querySelector("html");
    html.classList.toggle("dark", theme === "dark");
    const body = document.querySelector("body");
    body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const showHandler = () => {
    setIsShownav((prev) => !prev);
  };
  return (
    <>
      <header className="w-[90%] m-auto flex items-center justify-between px-4 py-2 border border-gray-500 rounded-lg mt-3">
        <Link to="/" className="logo flex items-center">
          <p className="font-lale text-xl dark:text-gray-200">بلاگ</p>
          <img src={logo} className="w-10 h-10" />
        </Link>
        {/* nav icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={showHandler}
          className="size-6 dark:text-gray-200 md:hidden">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        {/* mobile nav */}
        <div
          className={`fixed  ${
            isShownav ? "top-0" : "-top-[800px]"
          } -right-0 w-full  h-full transition-all delay-300  z-30 bg-white dark:bg-gray-800 p-4`}>
          <div className="flex items-center justify-between border-b-2 border-gray-200 mb-4">
            <h2 className=" ">
              <Link to="/" className="logo flex items-center">
                <p className="font-lale text-xl dark:text-gray-200">بلاگ</p>
                <img src={logo} className="w-10 h-10" />
              </Link>
            </h2>
            <div onClick={showHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 dark:text-gray-200">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <nav className="font-vazir text-md text-gray-600 dark:text-gray-200 font-semibold transition-all delay-300 ">
            <ul
              className="flex flex-col items-right justify-center gap-y-4  "
              onClick={showHandler}>
              <li className="hover:text-purple-600 ">
                <Link to="/">خانه</Link>
              </li>
              <li className="hover:text-purple-600 ">
                <Link to="/about">درباره ی ما</Link>
              </li>
              <li className="hover:text-purple-600 ">
                <Link to="/blogs">بلاگ</Link>
              </li>
            </ul>
          </nav>

          <div className=" items-center justify-right gap-y-2  mt-4 mb-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={toggleTheme}
              className={`size-6 ${
                theme === "dark" ? "block" : "hidden"
              } dark:text-gray-200`}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={toggleTheme}
              className={`size-6 ${
                theme === "dark" ? "hidden" : "block"
              } dark:text-gray-200`}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>

          <div class="relative  ">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ]">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="جستوجو..."
            />
          </div>
        </div>

        <nav className="font-vazir text-md md:block hidden text-gray-600 dark:text-gray-200 font-semibold transition-all delay-300 ">
          <ul className="flex items-center justify-center gap-x-4  ">
            <li className="hover:text-purple-600 ">
              <Link to="/">خانه</Link>
            </li>
            <li className="hover:text-purple-600 ">
              <Link to="/about">درباره ی ما</Link>
            </li>
            <li className="hover:text-purple-600 ">
              <Link to="/blogs">بلاگ</Link>
            </li>
          </ul>
        </nav>
        <div class="relative md:block hidden ">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-navbar"
            class="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="جستوجو..."
          />
        </div>
        {/* dark mood ico */}
        <div className="flex items-center justify-center gap-x-4">
          <div className=" items-center justify-center gap-x-2 hidden md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={toggleTheme}
              className={`size-6 ${
                theme === "dark" ? "block" : "hidden"
              } dark:text-gray-200`}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={toggleTheme}
              className={`size-6 ${
                theme === "dark" ? "hidden" : "block"
              } dark:text-gray-200`}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
          {user ? (
            <DropProfile />
          ) : (
            <div className="flex items-center">
              <button className=" bg-gradient-to-r from-indigo-500  to-pink-500 px-4 py-2 rounded-md">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-x-1">
                  <p className="font-vazir text-md text-white border-l-2 border-gray-400 ml-1 px-2">
                    ورود
                  </p>
                  <p className="font-vazir text-md text-white ">ثبت نام</p>
                </Link>
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
