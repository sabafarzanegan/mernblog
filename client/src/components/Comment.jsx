import React, { useEffect, useState } from "react";
import moment from "moment";

function CommentPart({ ...item }) {
  const [user, setUser] = useState({});

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
  }, [item._id]);
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
        </div>
      </section>
    </>
  );
}

export default CommentPart;
