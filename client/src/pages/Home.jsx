import React, { useEffect, useState } from "react";
import { CardPost } from "../components/Card";
import { Button, Spinner } from "flowbite-react";

function Home() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchposts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getPosts`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchposts();
  }, []);

  return (
    <>
      <h1 className="font-lale text-3xl mt-3 text-center">بلاگ مرن</h1>
      <h2 className="text-right font-vazir text-xl p-2  ">آخرین مقالات </h2>

      <section className="w-[90%] mt-4 m-auto flex items-center justify-center gap-x-2 gap-y-5 flex-wrap ">
        {loading ? (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        ) : (
          posts.map((post) => <CardPost post={post} />)
        )}
      </section>
    </>
  );
}

export default Home;
