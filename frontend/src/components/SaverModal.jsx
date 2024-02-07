import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import api from "../axios/api";
import GoogleAuth from "./GoogleAuth";
import toast from "react-hot-toast";

function SaverModal({ generatedPass }) {
  const token = localStorage.getItem("AppToken");
  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const savePassword = async () => {
    try {
      await api.post("/user/password/save", {
        content: { label, pass: generatedPass },
      });
      toast.success("Password Stored!");
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <button
        className="flex gap-3 justify-center text-lg bg-side-bar px-6 py-1 w-full"
        onClick={() => {isLoggedIn?setShowModal(true):toast.error("Loggin to store password.")}}
      >
        <FaRegSave size={28} /> Save Password
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-med-bg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-5 py-1 border-b border-solid border-blueGray-200 rounded-t text-side-bar">
                  <h3 className="text-xl font-semibold">Save Your Password</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0   float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <MdClose />
                  </button>
                </div>
                {/*body*/}
                {isLoggedIn ? (
                  <div className="relative p-6 flex-auto ">
                    <div>
                      <input
                        type="text"
                        value={label}
                        className="bg-sec-bg-color px-4 py-1 w-full outline-none rounded"
                        onChange={(e) => setLabel(e.target.value)}
                      />
                      <p className="text-sm opacity-80 text-side-bar">
                        Give a Label for password to save.
                      </p>
                    </div>
                  </div>
                ) : (
                  <GoogleAuth />
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  {isLoggedIn && (
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => savePassword()}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default SaverModal;
