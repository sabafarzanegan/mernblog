import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Spinner, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [postIdToDelet, setPostIdToDelet] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [userPost]);
  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeletePost = async () => {
    setshowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelet}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPost((prev) => prev.filter((post) => post.id !== postIdToDelet));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && userPost.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Date Update</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>

                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {userPost.map((post) => (
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setshowModal(true);
                          setPostIdToDelet(post._id);
                        }}
                        className="font-medium font-vazir text-red-500  cursor-pointer">
                        حذف
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500  font-vazir"
                        to={`/update-post/${post._id}`}>
                        <span>اصلاح</span>
                      </Link>
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
              از حذف مقاله اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashPost;
