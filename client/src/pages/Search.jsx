import { Button, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardPost } from "./../components/Card";

function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParam.get("searchTerm");
    const sortFromUrl = urlParam.get("sort");
    const categoryFromUrl = urlParam.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPost = async () => {
      setLoading(true);
      const searchQuery = urlParam.toString();
      try {
        const res = await fetch(`api/post/getposts?${searchQuery}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          console.log(data.posts);
          setLoading(false);
          if ((data.posts, length === 9)) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      setSidebarData({ ...sidebarData, sort: e.target.value });
    }
    if (e.target.id === "category") {
      setSidebarData({ ...sidebarData, category: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(location.search);
    urlParam.set("searchTerm", sidebarData.searchTerm);
    urlParam.set("sort", sidebarData.sort);
    urlParam.set("category", sidebarData.category);
    const searchQuery = urlParam.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <>
      <h1 className="font-lale text-center text-xl mt-3">صفحه جست وجو </h1>
      <div className="flex items-start justify-between ">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-y-2 mt-6 px-4  ">
          <label htmlFor="" className="font-vazir text-md  ">
            کلمه جستجو
          </label>
          <TextInput
            placeholder="search"
            id="searchTerm"
            type="text"
            value={sidebarData.searchTerm}
            onChange={handleChange}
          />
          <label htmlFor="" className="font-vazir text-md  ">
            ترتیب
          </label>
          <Select
            onChange={handleChange}
            value={sidebarData.sort}
            className="font-vazir w-full"
            id="sort">
            <option value="desc">قدیمی ترین</option>
            <option value="asc">جدیدترین</option>
          </Select>

          <label htmlFor="" className="font-vazir text-md  ">
            دسته بندی
          </label>
          <Select
            onChange={handleChange}
            value={sidebarData.category}
            className="font-vazir w-full"
            id="category">
            <option value="uncategorized">uncategorized</option>
            <option value="reactjs">react</option>
            <option value="nextjs">next</option>
            <option value="javaScript">js</option>
          </Select>
          <Button type="submit" className="font-vazir mt-2 w-full">
            جستجو
          </Button>
        </form>
        <div className="w-full px-2">
          <h2 className="font-vazir mt-2 border-b border-b-slate-500 p-1 text-xl">
            نتیجه:
          </h2>

          {loading ? (
            <Spinner color="info" className="m-auto w-full mt-6 " size="lg" />
          ) : (
            <div className="flex items-center justify-center gap-6 flex-wrap m-auto mt-4 ">
              {posts.map((post) => (
                <CardPost post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
