import React, { JSX } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import authService from "../../services/auth.service";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const login = await authService.Login(userData);
      if (login) {
        toast("Login successful");
        localStorage.setItem("email", login.user.user.email);
        localStorage.setItem("accessToken", login.user.user.accessToken);
        localStorage.setItem("userId", login.user.user._id);
      }
      else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
    catch (error) {
      toast.error("Error during login. Please try again.");
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
        <h2 className="sub-heading mb-4">Log in to Your Account</h2>
        <p className="mb-4 text">Enter your email and password to login.</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="label">Email</label>
            <input type="email" placeholder="Email" name="email" className="input-field" onChange={handleChange} value={userData.email} required />
          </div>
          <div className="flex flex-col mt-[2px]">
            <label className="label">Password</label>
            <input type="password" placeholder="Password" name="password" className="input-field" onChange={handleChange} value={userData.password} required />
          </div>
          <p className="flex justify-end primary-text underline"><a href="/send-otp">Forgot Passwod</a></p>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="text mt-4 flex gap-1 text-center justify-center">
          Don't have an account yet? <a href="/register" className="underline font-semibold">Sign Up</a>
        </p>
      </div>
    </div>
  );
};