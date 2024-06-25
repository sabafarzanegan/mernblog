import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Spinner, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function DashComment() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [commentsIdToDelet, setCommentsIdToDelet] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeletComment = async () => {
    setshowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentsIdToDelet}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentsIdToDelet)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && comments.length > 0 ? (
          <div className="overflow-x-auto">
            <Table className="font-vazir font-semibold">
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>comment content</Table.HeadCell>
                <Table.HeadCell>Number of Likes</Table.HeadCell>
                <Table.HeadCell>post Id</Table.HeadCell>
                <Table.HeadCell>User Id</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {comments.map((comment) => (
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>

                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setshowModal(true);
                          setCommentsIdToDelet(comment._id);
                        }}
                        className="font-medium font-vazir text-red-500  cursor-pointer">
                        حذف
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showmore && (
              <Button
                onClick={handleShowMore}
                className="font-vazir  m-auto mt-3">
                مشاهده بیشتر{" "}
              </Button>
            )}
          </div>
        ) : (
          <Spinner
            aria-label="Center-aligned spinner example"
            size="xl"
            className="flex items-center justify-center w-40 text-center"
          />
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setshowModal(false)}
        popup
        size="md"
        className="font-vazir ">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              از حذف کامنت اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletComment}>
                بله
              </Button>
              <Button color="gray" onClick={() => setshowModal(false)}>
                نه!
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DashComponent;
