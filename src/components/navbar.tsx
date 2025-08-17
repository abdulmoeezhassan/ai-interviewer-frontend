import React, { JSX } from "react";
import { RiTaskLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname; const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  }

  return (
    <div className="flex flex-row justify-between p-4 bg-white shadow-sm border-b">
      <div className="text-2xl font-bold primary-text">
        talport<sup className="text-xs align-top">™</sup>
      </div>

      <div className="lg:flex md:flex gap-6 hidden">
        <div
          className={`flex items-center gap-2 cursor-pointer hover:text-purple-700 ${currentPath === "/home" ? "text-purple-600 " : ""
            }`}
          onClick={() => { handleNavigation("/home") }}
        >
          <span>{HiOutlineHome({ size: 20 }) as JSX.Element}</span>
          <p>Home</p>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer hover:text-purple-700 ${currentPath === "/assessments" ? "text-purple-600 " : ""
            }`}
          onClick={() => { handleNavigation("/assessments") }}
        >
          <span>{RiTaskLine({ size: 20 }) as JSX.Element}</span>
          <p>Assessments</p>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer hover:text-purple-700 ${currentPath === "/profile" ? "text-purple-600 " : ""
            }`}
          onClick={() => { handleNavigation("/profile") }}
        >
          <span>{HiOutlineUser({ size: 20 }) as JSX.Element}</span>
          <p>Profile</p>
        </div>
        {/* <div
          className={`flex items-center gap-2 cursor-pointer hover:text-[#df584e] ${currentPath === "/calender" ? "text-red-500 " : ""
            }`}
          onClick={() => { handleNavigation("/calender") }}
        >
          <span>{HiOutlineCalendar({ size: 20 }) as JSX.Element}</span>
          <p>Calendar</p>
        </div> */}
      </div>

      <div className="flex gap-2">
        <span className="hover:text-purple-700">{HiOutlineQuestionMarkCircle({ size: 20 }) as JSX.Element}</span>
        <span className="hover:text-purple-700">{IoNotificationsOutline({ size: 20 }) as JSX.Element}</span>
        <span className="hover:text-purple-700">{CiLogout({ size: 20 }) as JSX.Element}</span>
      </div>
    </div>
  );
};
