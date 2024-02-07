import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PasswordList from "../components/PasswordList";
import { useNavigate } from "react-router-dom";

function MyPasswordsPage() {
  const token = localStorage.getItem("AppToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="flex ">
      <Sidebar />
      <div className="  p-4  h-screen w-full">
        <PasswordList />
      </div>
    </div>
  );
}

export default MyPasswordsPage;
