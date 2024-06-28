import { Sidebar } from "flowbite-react";
import { FaUserCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";

import { RxDashboard } from "react-icons/rx";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { useSelector } from "react-redux";
export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="border-l dark:bg-gray-700 w-full md:w-56">
      <Sidebar.Items className="font-vazir ">
        <Sidebar.ItemGroup className="flex flex-col gap-y-2">
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=dashboard">
              <Sidebar.Item
                active={tab === "dashboard"}
                href="#"
                as="div"
                icon={RxDashboard}>
                داشبورد
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              href="#"
              as="div"
              label={currentUser.isAdmin ? "Admin" : "User"}
              icon={FaUserCheck}>
              پروفایل
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=post">
              <Sidebar.Item
                active={tab === "post"}
                href="#"
                as="div"
                icon={IoDocumentAttach}>
                مقالات
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                href="#"
                as="div"
                icon={FaUsers}>
                کاربران
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments"}
                href="#"
                as="div"
                icon={FaRegComments}>
                نظرات
              </Sidebar.Item>
            </Link>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
