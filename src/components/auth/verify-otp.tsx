import React, { JSX } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { authService } from "../../services/auth.service";
import { toast } from "react-toastify";

export const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = React.useState<Array<string>>(new Array(4).fill(''));
  const inputs = React.useRef<Array<HTMLInputElement | null>>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      otp: otp.join(""),
      email: localStorage.getItem("email") || ''
    }
    try {
      const isOtpVerified = await authService.VerifyOtp(payload);
      if (isOtpVerified) {
        toast("Otp Verified Successfully");
      }
      else {
        toast.error("Incorrect Otp. Enter correct Otp.");
      }
    }
    catch (error) {
      toast.error("Invalid otp. Enter correct otp");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 md:px-20 lg:px-[100px] xl:px-[158px] justify-center">
      <div className="hidden lg:flex w-1/2 flex-col pr-20 justify-center">
        <h1 className="heading">
          Get Matched to Global Opportunities
        </h1>
        <p className="text">
          Join the top 3% of AI-vetted tech talent worldwide and connect with top startups and enterprises.
        </p>
        <p className="sub-heading mb-4">Why Join talport™?</p>
        <p className="flex flex-row gap-2 items-center">
          <span>{AiOutlineSearch({ size: 20 }) as JSX.Element}</span>
          <span>
            AI-Matched Roles: Instantly access opportunities that match your skills, experience, and career goals.
          </span>
        </p>
        <p className="flex flex-row gap-2 items-center">
          <span>{FaCheckCircle({ size: 20 }) as JSX.Element}</span>
          <span>
            Verified = Visible: Complete AI-powered skill assessments to boost your profile visibility and rank higher.
          </span>
        </p>
        <p className="flex flex-row gap-2 items-center">
          <span>{MdLanguage({ size: 20 }) as JSX.Element}</span>
          <span>
            ⁠Work Without Borders: Access remote roles, earn in global currencies, and connect with teams that value your skills.
          </span>
        </p>
      </div>
      <div className="bg-white rounded-lg my-auto p-[45px] py-[42px] border border-[#CBD5E1] max-w-[424px] pb-[22px] w-full">
        <h2 className="sub-heading mb-4">Verify Otp</h2>
        <p className="mb-4 text">Please Enter Verification Code Sent to Your Email.</p>
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 items-center justify-center">
            {
              otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  ref={(el) => {inputs.current[index] = el}}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="border w-[50px] h-[40px] text-center rounded-md border-gray-300"
                />
              ))
            }
          </div>
          <p className="flex justify-end primary-text underline"><a href="/login">Sign In</a></p>
          <button type="submit" className="btn-primary" onClick={handleSubmit}>Verify</button>
        </form>
      </div>
    </div>
  );
};