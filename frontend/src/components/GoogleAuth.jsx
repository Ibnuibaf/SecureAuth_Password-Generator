import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../axios/api";

function GoogleAuth({onHandleLogin}) {
  
  const googleLogin = useGoogleLogin({
    onSuccess: onHandleLogin,
    // onError: console.log("moonji"),
  });
  return (
    <>
      <button
        className="flex items-center rounded-full border px-3"
        onClick={() => googleLogin()}
      >
        <img src="/google.png" alt="" className="h-8 w-8 " /> Login
      </button>
    </>
  );
}

export default GoogleAuth;
