import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoArrowUp } from "react-icons/go";
import { MdArticle } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaRegComments } from "react-icons/fa6";
import { Button, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";

function TotalDash() {
  const [Post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUser, setTotalUser] = useState(null);
  const [totalPost, setTotalPost] = useState(null);
  const [totalComments, settotalComments] = useState(null);
  const [lastMonthUser, setlastMonthUser] = useState(null);
  const [lastMonthPost, setlastMonthPost] = useState(null);
  const [lastMonthComments, setlastMonthComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/getposts?=limit=5");
        if (res.ok) {
          const data = await res.json();
          setLoading(false);
          setPost(data.posts);
          setTotalPost(data.totalPosts);
          setlastMonthPost(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/comment/getcomments?=limit=5");
        if (res.ok) {
          const data = await res.json();
          setLoading(false);

          setComments(data.comments);
          settotalComments(data.totalComments);
          setlastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/getusers?=limit=5");
        if (res.ok) {
          const data = await res.json();
          setLoading(false);
          setUser(data.users);
          setTotalUser(data.totalUsers);
          setlastMonthUser(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
      fetchPost();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <>
      {/* total section */}
      {loading ? (
        <Spinner
          color="info"
          aria-label="Info spinner example"
          size="xl"
          className="flex items-center justify-center"
        />
      ) : (
        <section className="  w-full flex flex-col gap-y-1 items-center justify-between m-auto mt-4 mb-7 px-4">
          <div className="  flex items-start justify-between border w-full border-gray-300  rounded-md p-2">
            {/* icon */}
            <div>
              <MdArticle className="  bg-teal-500 text-white p-3 rounded-full text-5xl" />
            </div>
            <div className="flex flex-col items-center">
              {/* info */}
              <h3 className="font-lale text-lg">کل مقالات</h3>
              <h4 className="font-vazir text-lg">{totalPost}</h4>
              <p className="flex items-center justify-center gap-x-1 text-green-500">
                <span className="text-lg font-bold">
                  {" "}
                  <GoArrowUp />
                </span>
                <p className="text-gray-600 dark:text-gray-300  font-vazir">
                  {lastMonthPost}عدد در ماه
                </p>
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between border w-full border-gray-300  rounded-md p-2">
            {/* icon */}
            <div>
              <HiUsers className=" bg-teal-500 text-white p-3 rounded-full text-5xl" />
            </div>
            <div className="flex flex-col items-center">
              {/* info */}
              <h3 className="font-lale text-lg">کل کاربران</h3>
              <h4 className="font-vazir text-lg">{totalUser}</h4>
              <p className="flex items-center justify-center gap-x-1 text-green-500">
                <span className="text-lg font-bold">
                  {" "}
                  <GoArrowUp />
                </span>
                <p className="text-gray-600 dark:text-gray-300  font-vazir">
                  {lastMonthUser}عدد در ماه
                </p>
              </p>
            </div>
          </div>

          <div className="flex items-start justify-between border  w-full border-gray-300  rounded-md p-2">
            {/* icon */}
            <div>
              <FaRegComments className=" bg-teal-500 text-white p-3 rounded-full text-5xl" />
            </div>
            <div className="flex flex-col items-center">
              {/* info */}
              <h3 className="font-lale text-lg">کل نظرات</h3>
              <h4 className="font-vazir text-lg">{totalComments}</h4>
              <p className="flex items-center justify-center gap-x-1 text-green-500">
                <span className="text-lg font-bold">
                  {" "}
                  <GoArrowUp />
                </span>
                <p className="text-gray-600 dark:text-gray-300  font-vazir">
                  {lastMonthComments}عدد در ماه
                </p>
              </p>
            </div>
          </div>
          <section className="font-vazir mt-2 pt-4 border-t-2 border-t-green-600  w-full  ">
            <h3 className="mb-3 text-lg"> آخرین کاربران </h3>
            <Link to="/dashboard?tab=users">
              <Button outline gradientDuoTone="purpleToPink" className="mb-4">
                بیشتر
              </Button>
            </Link>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>User Email</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                {user.map((user) => (
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </div>
          </section>

          <section className="font-vazir mt-2 pt-4 border-t-2 border-t-green-600  w-full  ">
            <h3 className="mb-3 text-lg"> آخرین نظرات </h3>
            <Link to="/dashboard?tab=comments">
              <Button outline gradientDuoTone="purpleToPink" className="mb-4">
                بیشتر
              </Button>
            </Link>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Comment Content</Table.HeadCell>
                  <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                {comments.map((comment) => (
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{comment.content}</Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </div>
          </section>

          <section className="font-vazir mt-2 pt-4 border-t-2 border-t-green-600  w-full  ">
            <h3 className="mb-3 text-lg"> آخرین مقالات </h3>
            <Link to="/dashboard?tab=post">
              <Button outline gradientDuoTone="purpleToPink" className="mb-4">
                بیشتر
              </Button>
            </Link>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Post Image</Table.HeadCell>
                  <Table.HeadCell>title</Table.HeadCell>
                </Table.Head>
                {Post.map((post) => (
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt=""
                          className="w-32 rounded-md"
                        />
                      </Table.Cell>
                      <Table.Cell>{post.title}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </div>
          </section>
        </section>
      )}
    </>
  );
}

export default TotalDash;
