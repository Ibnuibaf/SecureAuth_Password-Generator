import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdLabelImportant } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import swal from "sweetalert";
import api from "../axios/api";
import toast from "react-hot-toast";

function PasswordList() {
  const [passwordsList, setPasswordsList] = useState([]);
  const [search,setSearch]=useState("")
  const getPasswords = async () => {
    try {
      const response = await api.get(`/user/password?search=${search}`);
      setPasswordsList(response.data.passwords);
    } catch (error) {
      console.error(error);
    }
  };
  const removePassword = async (id) => {
    const res = await swal("Are you sure you want to do this?", {
      buttons: ["Cancel", true],
    });
    if (res) {
      try {
        await api.patch("/user/password/remove", { id });
        await getPasswords();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard")
  };
  useEffect(() => {
    getPasswords();
  }, []);
  return (
    <div className="p-5">
      <div className="flex justify-start w-2/4">
        <div className="flex bg-med-bg text-side-bar w-full  justify-between px-3 py-1">
          <input
            type="text"
            placeholder="Search for saved password by Label.."
            className="bg-transparent w-full outline-none"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <IoSearch size={24} className="cursor-pointer" title="search" onClick={()=>getPasswords()}/>
        </div>
      </div>
      <div className="h-full p-10">
        <div className="grid grid-cols-3 max-h-[80vh]  overflow-y-auto gap-3">
          {passwordsList.map((password) => (
            <div className="bg-side-bar flex items-center p-2 justify-between mx-2 hover:m-0 transition-all duration-300">
              <div className="flex items-center gap-1 w-full pr-4">
                <MdLabelImportant size={40} />
                <div className="w-full ">
                  <p>{password.label}</p>
                  <p className="flex justify-end w-full text-sm opacity-80">
                    {password.pass}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <button onClick={() => copyToClipboard(password.pass)}>
                  <FaRegCopy size={22} />
                </button>
                <button onClick={() => removePassword(password._id)}>
                  <FiDelete size={22} className="text-pink-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PasswordList;
