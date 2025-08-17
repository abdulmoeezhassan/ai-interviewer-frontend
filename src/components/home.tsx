import React from "react";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const naviagte = useNavigate();
  return (
    <>
      <Navbar />
      <main>

        <section className="flex flex-col items-center justify-center text-center py-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient-fade">
            Practice Smarter with AI Interviews
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
            Get personalized feedback, improve your confidence, and master your interviews with our AI-powered interviewer.
          </p>

          <div className="mt-12 flex gap-4">
            <button className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow-lg 
              hover:bg-purple-700 hover:shadow-xl active:scale-95 transition-all duration-300" onClick={()=>{naviagte("/assessments")}}>
              Start Interview
            </button>
            {/* <button className="px-6 py-3 rounded-2xl border-2 border-purple-600 text-purple-600 font-semibold 
              hover:bg-purple-600 hover:text-white shadow-md active:scale-95 transition-all duration-300">
              Watch Demo
            </button> */}
          </div>
        </section>

        <section className="pb-10 pt-5">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition transform duration-300 border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Choose Interview</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick the type of interview you want to practice: technical, english, or ai-native.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition transform duration-300 border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-2xl mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Talk with AI</h3>
              <p className="text-gray-600 leading-relaxed">
                Answer real-time questions with our AI interviewer, just like in a real interview.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition transform duration-300 border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-white text-2xl mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Get Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive instant feedback, scores, and personalized tips to improve.
              </p>
            </div>
          </div>
        </section>


        <footer className="absolute bottom-4 left-0 w-full text-center">
          <p>&copy; {new Date().getFullYear()} AI Interviewer. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};
