import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashComment from "../components/DashComponent";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          {/* sidebar */}
          <DashSidebar />
        </div>
        {tab === "dashboard" && <DashProfile />}

        {tab === "profile" && <DashProfile />}
        {/* profile */}
        {/* post */}
        {tab === "post" && <DashPost />}
        {tab === "users" && <DashUsers />}
        {tab === "comments" && <DashComment />}
      </div>
    </>
  );
}

export default Dashboard;
