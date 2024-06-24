import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommentPart from "./Comment";

function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const Navigate = useNavigate();
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

      if (res.ok) {
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [comments]);
  const handleLike = async (commentId) => {
    if (!currentUser) {
      Navigate("/login");
      return;
    }
    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setComment(
          comments.map((comment) => {
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const delethandler = async (commentId) => {
    try {
      if (!currentUser) {
        Navigate("/login");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();

        setComments(
          comments.filter((item) => {
            item._id !== commentId;
          })
        );
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
      {comments && (
        <div className="w-[60%] m-auto">
          <div className="flex items-center justify-between ">
            <h3 className="font-lale text-center  my-3 text-2xl">نظرات</h3>
            <span className="font-vazir text-lg border border-green-400 w-6 h-6 flex items-center justify-center rounded-full ">
              {comments.length}
            </span>
          </div>
          {comments.map((item) => (
            <CommentPart
              key={item._id}
              item={item}
              onlike={handleLike}
              onDelete={delethandler}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CommentSection;
