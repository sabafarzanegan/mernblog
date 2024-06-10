import React, { useState } from "react";
import ProfileLogo from "../asset/image/icons8-user-default-64.png";

function DropProfile() {
  const [profile, setProfile] = useState(false);
  const profileHandler = () => {
    setProfile((prev) => !prev);
  };
  return (
    <>
      <div onClick={profileHandler}>
        <img src={ProfileLogo} alt="" className="" />
      </div>
      {profile ? (
        <div
          id="dropdown"
          className=" absolute top-20  md:left-24 bg-white divide-y divide-gray-800 dark:divide-gray-200 rounded-lg shadow w-44 dark:bg-gray-700 p-2">
          <h3 className="mx-2 text-gray-700 dark:text-gray-200 py-1">
            saba@gmail.com
          </h3>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col justify-center"
            aria-labelledby="dropdownDefaultButton">
            <li className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <a
                href="#"
                className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                بروفایل
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </li>

            <li className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <a href="#" className="block px-2 py-2 font-vazir">
                خروج
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DropProfile;
