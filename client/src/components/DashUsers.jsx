import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Spinner, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [userIdToDelet, setUserIdToDelet] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
    }
  }, [users]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeletuser = async () => {
    setshowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelet}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user.id !== userIdToDelet));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && users.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>user Image</Table.HeadCell>
                <Table.HeadCell>user image </Table.HeadCell>
                <Table.HeadCell>user email </Table.HeadCell>
                <Table.HeadCell>admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${user.slug}`}>
                        <img
                          src={user.profilePicture}
                          className="w-1- h-10 object-cover rounded-full  overflow-hidden bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <IoMdClose className="text-red-600" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setshowModal(true);
                          setUserIdToDelet(user._id);
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
              از حذف کاربر اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletuser}>
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

export default DashUsers;
