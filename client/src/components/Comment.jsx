import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function CommentPart({ item, onlike, onDelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${item.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [item]);
  return (
    <>
      <section className="py-3">
        <div className=" p-3 m-auto border border-green-400 rounded-md">
          <div className="flex  items-center gap-x-2">
            <span className="font-vazir ">کاربر:</span>
            <p className="font-vazir text-gray-900 dark:text-gray-300">
              {user.username}
            </p>
            <span className="font-vazir text-left text-md text-gray-500">
              {moment(item.createdAt).fromNow()}
            </span>
          </div>
          <p>{item.content}</p>
          <div className="flex items-center  gap-x-1 mt-2">
            <button
              type="button"
              onClick={() => {
                onlike(item._id);
              }}
              className={`text-gray-500 hover:text-blue-500 mt-2 ${
                currentUser &&
                item.likes.includes(currentUser._id) &&
                "!text-red-600"
              }`}>
              <FaThumbsUp className="text-sm " />
            </button>
            <p className="text-gray-400 text-sm mt-1">
              {" "}
              {item.numberOfLikes > 0 && item.numberOfLikes + " "}likes{" "}
            </p>
            {(currentUser && currentUser._id === user._id) ||
            (currentUser && currentUser.isAdmin) ? (
              <button
                onClick={() => {
                  onDelete(item._id);
                }}
                className="font-vazir text-gray-400 text-md mt-1 px-2 hover:text-red-600">
                حذف
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CommentPart;
