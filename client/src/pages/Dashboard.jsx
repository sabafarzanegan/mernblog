import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

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
        {tab === "profile" && <DashProfile />}
        {/* profile */}
      </div>
    </>
  );
}

export default Dashboard;
