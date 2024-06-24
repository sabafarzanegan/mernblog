import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { CardPost } from "../components/Card";

function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erroe, setError] = useState(false);
  const [recentPost, setRecentPost] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(erroe);
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);
  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
      } catch (error) {
        console.log(erroe);
      }
    };
    fetchRecentPost();
  }, []);
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner
            color="success"
            aria-label="Success spinner example"
            size="xl"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full">
        {post && (
          <div className="w-[80%] m-auto flex flex-col items-center mt-3">
            <h1 className="my-6 text-center font-vazir text-2xl">
              {post.title}
            </h1>
            <Link
              className=" font-vazir mb-4 "
              to={`/search?category=${post.category}`}>
              <Button color="gray" pill>
                {post.category}
              </Button>
            </Link>
            <img src={post.image} className="rounded-md w-[60%] m-auto" />
            <div className="flex flex-wrap items-center justify-between italic w-[60%] mt-5 py-2 border-b border-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <p>{(post.content.length / 1000).toFixed(0)}mins read</p>
            </div>
            <div
              className="w-[80%] md:w-[60%] py-4 tracking-wide leading-10 font-vazir text-md  "
              dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        )}
        <CommentSection className="mt-5 mb-5" postId={post._id} />
        <h2 className="font-vazir text-xl mt-3 text-center">آخرین مقاله ها</h2>
        <div className="flex items-center justify-center md:justify-between mt-4 p-4 flex-wrap gap-y-3">
          {recentPost && recentPost.map((post) => <CardPost post={post} />)}
        </div>
      </div>
    </>
  );
}

export default PostPage;
