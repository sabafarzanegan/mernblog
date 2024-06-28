import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CardPost } from "./../components/Card";
import { Button, Spinner } from "flowbite-react";

function Blogs() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showmore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserPost(data.posts);
          setLoading(false);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, []);
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
  return (
    <>
      <h1 className="font-vazir text-2xl mt-5 px-5 font-semibold">مقالات</h1>
      {loading ? (
        <Spinner color="info" size="lg" className="m-auto mt-3 w-full" />
      ) : (
        <div className="flex items-center justify-center gap-4 m-auto mt-4 flex-wrap">
          {userPost.map((post) => (
            <CardPost post={post} />
          ))}
        </div>
      )}
      <Button
        className="font-vazir text-lg m-auto  mt-4"
        onClick={handleShowMore}
        outline
        gradientDuoTone="purpleToBlue">
        مشاهده بیشتر
      </Button>
    </>
  );
}

export default Blogs;
