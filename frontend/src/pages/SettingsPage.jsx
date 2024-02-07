import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Logout from "../components/Logout";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const token = localStorage.getItem("AppToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token]);
  return (
    <div className="flex ">
      <Sidebar />
      <div className="  p-4  h-screen w-full">
        <div className="flex justify-end px-10">
          <Logout />
        </div>
        <div className="mt-8 text-lg">
          <p>Welcome to the Settings page!</p>
          <p>Here you can customize your app preferences.</p>
          <p>Feel free to explore and adjust the settings as needed.</p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
