import { Sidebar } from "flowbite-react";
import { FaUserCheck } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashSidebar() {
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
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              href="#"
              icon={FaUserCheck}>
              داشبورد
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
