import { LuBadgeInfo, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { MdStorage } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="bg-side-bar  w-1/6  h-screen flex flex-col justify-between">
      <div className="h-full">
        <div className="bg-white text-black relative w-[17.5vw] px-4 py-1 rounded-r-full">
          <h2 className="text-2xl font-bold ">Secure Auth </h2>
        </div>
        <div className=" h-2/4  flex justify-end">
          <div className="h-full flex flex-col justify-evenly w-3/4">
            <Link to={"/"} className="flex gap-2 bg-sec-bg-color px-4 py-2 rounded-l-full hover:bg-transparent border-2 border-r-0 border-sec-bg-color cursor-pointer transition duration-300">
              <LuLayoutDashboard size={24} /> Home
            </Link>
            <Link to={"/mypasswords"} className="flex gap-2 bg-sec-bg-color px-4 py-2 rounded-l-full hover:bg-transparent border-2 border-r-0 border-sec-bg-color cursor-pointer transition duration-300">
              <MdStorage size={24} /> My Passwords
            </Link>
            <Link to={"/settings"} className="flex gap-2 bg-sec-bg-color px-4 py-2 rounded-l-full hover:bg-transparent border-2 border-r-0 border-sec-bg-color cursor-pointer transition duration-300">
              <LuSettings size={24} /> Settings
            </Link>
            <Link className="flex gap-2 bg-sec-bg-color px-4 py-2 rounded-l-full hover:bg-transparent border-2 border-r-0 border-sec-bg-color cursor-pointer transition duration-300">
              <LuBadgeInfo size={24} /> About Us
            </Link>
            <Link className="flex gap-2 bg-sec-bg-color px-4 py-2 rounded-l-full hover:bg-transparent border-2 border-r-0 border-sec-bg-color cursor-pointer transition duration-300">
              <RiCustomerService2Line size={24} /> Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="relative bottom-0 w-full bg-med-bg text-black p-2 italic">
        <p className="text-center text-xs font-bold opacity-80">
          &copy; 2024 SecureAuth. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
