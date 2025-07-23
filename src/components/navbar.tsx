import React, { JSX } from "react";
import { RiTaskLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

export const Navbar: React.FC = () => {
  return (
    <div className="flex flex-row justify-between p-4 bg-white shadow-sm border-b">
      <div className="text-2xl font-bold primary-text">
        talport<sup className="text-xs align-top">™</sup>
      </div>

      <div className="lg:flex md:flex gap-6 hidden">
        <div className="flex items-center gap-2 cursor-pointer hover:text-[#df584e] ">
          <span>{HiOutlineHome({ size: 20 }) as JSX.Element}</span>
          <p>Home</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-[#df584e] ">
          <span>{RiTaskLine({ size: 20 }) as JSX.Element}</span>
          <p>Assessments</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-[#df584e] ">
          <span>{HiOutlineUser({ size: 20 }) as JSX.Element}</span>
          <p>Profile</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-[#df584e] ">
          <span>{HiOutlineCalendar({ size: 20 }) as JSX.Element}</span>
          <p>Calendar</p>
        </div>
      </div>

      <div className="flex gap-2">
          <span className="hover:text-[#df584e]">{HiOutlineQuestionMarkCircle({ size: 20 }) as JSX.Element}</span>
          <span className="hover:text-[#df584e]">{IoNotificationsOutline({ size: 20 }) as JSX.Element}</span>
          <span className="hover:text-[#df584e]">{CiLogout({ size: 20 }) as JSX.Element}</span>
      </div>
    </div>
  );
};
