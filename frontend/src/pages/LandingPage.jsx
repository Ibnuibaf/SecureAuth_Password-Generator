import { useEffect, useState } from "react";
import Generator from "../components/Generator";
import GoogleAuth from "../components/GoogleAuth";
import Sidebar from "../components/Sidebar";
import api from "../axios/api";

function LandingPage() {
  const token=localStorage.getItem("AppToken")
  const[userLogin,setUserLogin]=useState(false)
  const onHandleLogin = async (token) => {
    try {
    //   console.log(token);
      const response = await api.post("/user/login", {
        googleAuthtoken: token.access_token,
      });
      localStorage.setItem("AppToken", response.data.token);
      setUserLogin(true)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    if(token){
      console.log(token);
      setUserLogin(true)
    }
  },[token])
  return (
    <div className="flex ">
      <Sidebar />
      <div className="  p-4  h-screen w-full">
        <div className="flex justify-end px-10 ">
          {!userLogin&&<GoogleAuth onHandleLogin={onHandleLogin}/>}
        </div>
        <div className="flex justify-center items-center h-full w-full">
          <Generator />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
