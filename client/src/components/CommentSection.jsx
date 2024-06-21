import { Alert, Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const commentSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200 || comment.length == 0) {
      setCommentError("لطفا نظر خود را زیر 200 کلمه وارد کنید.");
      return;
    }
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[60%] m-auto rounded-md border p-4 border-green-400 ">
        {currentUser ? (
          <div>
            <Link to="/dashboard?tab=profile">
              <p className="text-center font-vazir">
                sign in as: <span>{currentUser.username}</span>
              </p>
            </Link>
          </div>
        ) : (
          <h4 className="font-vazir ">
            .<Link to="/login">ابتدا وارد حساب کاربری شوید</Link>
          </h4>
        )}
        {currentUser && (
          <form
            onSubmit={commentSubmit}
            className="w-[80%] m-auto p-6 font-vazir">
            <Textarea
              placeholder="نظرتان را بنویسید..."
              rows="3"
              maxLength="200"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <div className="flex items-center justify-between">
              <p className="mt-2 text-sm">
                {200 - comment.length} لغت باقی مانده
              </p>
              <Button
                type="submit"
                className="mt-2"
                outline
                gradientDuoTone="purpleToBlue">
                ارسال
              </Button>
            </div>
          </form>
        )}

        {commentError && <Alert color="failure">{commentError}</Alert>}
      </div>
    </>
  );
}

export default CommentSection;
