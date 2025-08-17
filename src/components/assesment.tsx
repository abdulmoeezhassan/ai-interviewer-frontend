import React, { JSX } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";

export const Assessment: React.FC = () => {
  const navigate = useNavigate();

  const handleStartAssessment = (type: string) => {
    navigate(`/interview/${type}`)
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto flex flex-col px-[50px] md:px-[96px] lg:px-[96px] xl:px-[96px] py-6 gap-6">

        <div className="bg-white rounded-lg my-auto p-[45px] py-[42px] border border-[#CBD5E1] flex flex-col gap-1 !px-[60px]">
          <div className="flex gap-3">
            <h1 className="text-lg font-bold">English Test</h1>
            <button className="bg-white rounded-lg my-auto p-[45px] border border-[#CBD5E1] flex gap-1 !py-1 !px-2">
              <span>{HiOutlineClock({ size: 20 }) as JSX.Element}</span>20min
            </button>
            <button className="bg-white rounded-lg my-auto p-[45px] border border-[#CBD5E1] flex gap-1 !py-1 !px-2">
              Difficult
            </button>
          </div>
          <p className="text-lg font-semibold">Our AI Agent is waiting...</p>
          <p>This test evaluates your programming skills, logical thinking and ability to write clean, efficient code to solve real world challenges.</p>
          <p className="font-bold mt-2">To complete the test successfully, ensure you have:</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 mt-2">
              <button className="assesment-buttons">A stable Internet connection</button>
              <button className="assesment-buttons">Uninterrapted power supply</button>
              <button className="assesment-buttons">Availability for the entire test duration (30 minutes)</button>
            </div>
            <div className="" onClick={() => handleStartAssessment("english")}>
              <button type="submit" className="btn-primary !w-auto">Start Assessment</button>
            </div>
          </div>
          <p className="text-purple-500 mt-2">Please complete the previous assessment(s) to unlock this one.</p>
        </div>

        <div className="bg-white rounded-lg p-[45px] py-[42px] border border-[#CBD5E1] flex flex-col gap-1 !px-[60px]">
          <div className="flex gap-3">
            <h1 className="text-lg font-bold">Coding Test</h1>
            <button className="bg-white rounded-lg my-auto p-[45px] border border-[#CBD5E1] flex gap-1 !py-1 !px-2">
              <span>{HiOutlineClock({ size: 20 }) as JSX.Element}</span>20min
            </button>
            <button className="bg-white rounded-lg my-auto p-[45px] border border-[#CBD5E1] flex gap-1 !py-1 !px-2">
              Difficult
            </button>
          </div>
          <p className="text-lg font-semibold">Our AI Agent is waiting...</p>
          <p>This test evaluates your programming skills, logical thinking and ability to write clean, efficient code to solve real world challenges.</p>
          <p className="font-bold mt-2">To complete the test successfully, ensure you have:</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 mt-2">
              <button className="assesment-buttons">A stable Internet connection</button>
              <button className="assesment-buttons">Uninterrapted power supply</button>
              <button className="assesment-buttons">Availability for the entire test duration (30 minutes)</button>
            </div>
            <div className="" onClick={() => handleStartAssessment("coding")}>
              <button type="submit" className="btn-primary !w-auto">Start Assessment</button>
            </div>
          </div>
          <p className="text-purple-500 mt-2">Please complete the previous assessment(s) to unlock this one.</p>
        </div>

        <div className="bg-white rounded-lg my-auto p-[45px] py-[42px] border border-[#CBD5E1] flex flex-col gap-1 !px-[60px]">
          <div className="flex gap-3">
            <h1 className="text-lg font-bold">AI-Native Test</h1>
            <button className="bg-white rounded-lg my-auto p-[45px] border border-[#CBD5E1] flex gap-1 !py-1 !px-2">
              <span>{HiOutlineClock({ size: 20 }) as JSX.Element}</span>20min
            </button>
            <button className="bg-white rounded-lg my-auto p-[45px] border border-[#CBD5E1] flex gap-1 !py-1 !px-2">
              Difficult
            </button>
          </div>
          <p className="text-lg font-semibold">Our AI Agent is waiting...</p>
          <p>This test evaluates your programming skills, logical thinking and ability to write clean, efficient code to solve real world challenges.</p>
          <p className="font-bold mt-2">To complete the test successfully, ensure you have:</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 mt-2">
              <button className="assesment-buttons">A stable Internet connection</button>
              <button className="assesment-buttons">Uninterrapted power supply</button>
              <button className="assesment-buttons">Availability for the entire test duration (30 minutes)</button>
            </div>
            <div className="" onClick={() => handleStartAssessment("prompt")}>
              <button type="submit" className="btn-primary !w-auto">Start Assessment</button>
            </div>
          </div>
          <p className="text-purple-500 mt-2">Please complete the previous assessment(s) to unlock this one.</p>
        </div>
        
      </div>
    </>
  );
};