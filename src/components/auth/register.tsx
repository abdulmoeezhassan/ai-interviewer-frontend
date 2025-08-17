import React, { JSX } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { MdLanguage } from 'react-icons/md';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userData } from "../../constants/types";
import { authService } from "../../services/auth.service";
import {
  FaGoogle,
  FaAmazon,
  FaApple,
  FaMicrosoft,
  FaStripe,
  FaFacebookF,
  FaAirbnb,
  FaDev,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaFilePdf,
  FaCamera,
} from "react-icons/fa";
import {
  SiFigma,
  SiNotion,
  SiRobinhood
} from "react-icons/si";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [userData, setUserData] = React.useState<userData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    englishProficiency: '',
    profilePicture: '',
    jobRole: '',
    yoe: '',
    level: '',
    primarySkill: '',
    resume: '',
    companyPreferences: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCompanyPreference = (companyName: string) => {
    setUserData((prev) => {
      const alreadySelected = prev.companyPreferences.includes(companyName);
      return {
        ...prev,
        companyPreferences: alreadySelected
          ? prev.companyPreferences.filter((name) => name !== companyName)
          : [...prev.companyPreferences, companyName],
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const size = file?.size || 0;
    if (size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profilePicture: reader.result as string }));
        toast("Profile picture uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const size = file?.size || 0;
    if (size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit");
      return;
    }
    if (file) {
      const fileType = file.type === "application/pdf";
      if (!fileType) {
        toast.error("Only PDF files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, resume: reader.result as string }));
        toast("Resume uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const register = await authService.SignUp(userData);
      if (register) {
        toast("Registration successful");
        navigate("/verify-otp");
      }
      else {
        toast.error("Registration failed. Please try again.");
      }
    }
    catch (error) {
      toast.error("Error during registration. Please try again.");
    }
  }

  const moveTeNextStep = () => {
    if (activeStep === 1) {
      const { firstName, lastName, email, password, phoneNumber, location, englishProficiency } = userData;
      if (!firstName || !lastName || !email || !password || !phoneNumber || !location || !englishProficiency) {
        toast.error("Please fill out all required personal details.");
        return;
      }
    }

    if (activeStep === 2) {
      const { profilePicture, jobRole, level, primarySkill, yoe } = userData;
      if (!profilePicture || !jobRole || !level || !primarySkill || !yoe) {
        toast.error("Please fill out all required professional experience fields.");
        return;
      }
    }

    if (activeStep === 3) {
      const { resume } = userData;
      if (!resume) {
        toast.error("Please upload your resume.");
        return;
      }
      handleSubmit({ preventDefault: () => { } } as React.FormEvent);
      return;
    }

    setActiveStep((prev) => prev + 1);
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 md:px-20 lg:px-[100px] xl:px-[158px] py-4 justify-center overflow-y-auto items-start">
      <div className="hidden lg:flex w-1/2 flex-col pr-20 justify-center py-[42px]">
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
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center w-14 cursor-pointer">
            <p className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-black ${activeStep === 1 ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}>
              1
            </p>
            <p className={`text-sm mt-2 ${activeStep === 1 ? 'text-black font-bold' : 'text-gray-600'}`}>Personal Details</p>
          </div>
          <div className="flex-1 h-px border-dashed border-t-2 border-gray-400 mx-2"></div>
          <div className="flex flex-col items-center w-14 cursor-pointer">
            <p className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${activeStep === 2 ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}>
              2
            </p>
            <p className={`text-sm mt-2 ${activeStep === 2 ? 'text-black font-bold' : 'text-gray-600'} cursor-pointer`}>Professional Experience</p>
          </div>
          <div className="flex-1 h-px border-dashed border-t-2 border-gray-400 mx-2"></div>
          <div className="flex flex-col items-center w-14 cursor-pointer">
            <p className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${activeStep === 3 ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}>
              3
            </p>
            <p className={`text-sm mt-2 ${activeStep === 3 ? 'text-black font-bold' : 'text-gray-600'}`}>Resume & Preferences</p>
          </div>
        </div>
        {activeStep === 1 && (
          <div className="flex flex-col">
            <h2 className="sub-heading mb-4">Personal Details</h2>
            <p className="mb-4 text">Get started with adding your personal details first.</p>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="label">First Name <span className="primary-text">*</span></label>
                <input type="text" placeholder="First Name" name="firstName" className="input-field" onChange={handleChange} value={userData.firstName} required />
              </div>
              <div className="flex flex-col gap-1 mt-[2px]">
                <label className="label">Last Name <span className="primary-text">*</span></label>
                <input type="text" placeholder="Last Name" name="lastName" className="input-field" onChange={handleChange} value={userData.lastName} required />
              </div>

              <div className="flex flex-col gap-1 mt-[2px]">
                <label className="label">Location <span className="primary-text">*</span></label>
                <select className="input-field bg-white" name="location" onChange={handleChange} value={userData.location} required>
                  <option value="" disabled selected>Select your location</option>
                  <option value="srilanka">Sri Lanka</option>
                  <option value="india">India</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="bangladesh">Bangladesh</option>
                  <option value="nepal">Nepal</option>
                  <option value="maldives">Maldives</option>
                </select>
              </div>

              <div>
                <label className="label">Email <span className="primary-text">*</span></label>
                <input type="email" placeholder="Email" name="email" className="input-field" onChange={handleChange} value={userData.email} required />
              </div>

              <div>
                <label className="label">Password <span className="primary-text">*</span></label>
                <input type="password" placeholder="Password" name="password" className="input-field" onChange={handleChange} value={userData.password} required />
              </div>

              <div>
                <label className="label">Phone Number <span className="primary-text">*</span></label>
                <input type="phoneNumber" placeholder="Phone Number" name="phoneNumber" className="input-field" onChange={handleChange} value={userData.phoneNumber} required />
              </div>

              <div className="flex flex-col gap-1 mt-[2px]">
                <label className="label">Select Your English Proficiency Level</label>
                <select className="input-field bg-white" name="englishProficiency" onChange={handleChange} value={userData.englishProficiency}>
                  <option value="" disabled selected>Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="native">Native</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" onClick={moveTeNextStep}>Next</button>
            </form>
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-col">
            <h2 className="sub-heading mb-4">Professional Experience</h2>
            <p className="mb-4 text">Upload your profile picture and tell us about your expertise.</p>
            <div className="relative w-16 h-16">
              <label
                htmlFor="profilePictureInput"
                className="block w-full h-full rounded-full overflow-hidden border border-[#CBD5E1] cursor-pointer"
              >
                {userData.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>{FaCamera({ size: 20 }) as JSX.Element}</span>
                  </div>
                )}
              </label>
              <label
                htmlFor="profilePictureInput"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer"
              >
                <span>{FaCloudUploadAlt({ size: 20 }) as JSX.Element}</span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="profilePictureInput"
                name="profilePicture"
                className="hidden"
                onChange={handleImageChange}
                required
              />
            </div>
            <p className="mb-4 text-xs mt-2">Max. 5MB allowed</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="label">Select Your Role <span className="primary-text">*</span></label>
                <select
                  name="jobRole"
                  className="input-field bg-white"
                  onChange={handleChange}
                  value={userData.jobRole}
                  required
                >
                  <option value="" disabled>Select your job role</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Mobile Developer">Mobile Developer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Security Engineer">Security Engineer</option>
                  <option value="Blockchain Developer">Blockchain Developer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="Technical Writer">Technical Writer</option>
                  <option value="Game Developer">Game Developer</option>
                  <option value="Embedded Systems Engineer">Embedded Systems Engineer</option>
                  <option value="Site Reliability Engineer">Site Reliability Engineer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 mt-[2px]">
                <label className="label">Select Your Experience Level <span className="primary-text">*</span></label>
                <select
                  name="level"
                  className="input-field bg-white"
                  onChange={handleChange}
                  value={userData.level}
                  required
                >
                  <option value="" disabled>Select experience level</option>
                  <option value="Intern">Intern</option>
                  <option value="Entry Level (0-1 years)">Entry Level (0–1 years)</option>
                  <option value="Junior (1-2 years)">Junior (1–2 years)</option>
                  <option value="Mid-Level (2-5 years)">Mid-Level (2–5 years)</option>
                  <option value="Senior (5-8 years)">Senior (5–8 years)</option>
                  <option value="Lead (8-10 years)">Lead (8–10 years)</option>
                  <option value="Principal/Staff Engineer">Principal/Staff Engineer</option>
                  <option value="Director / VP">Director / VP</option>
                  <option value="CTO / Tech Founder">CTO / Tech Founder</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 mt-[2px]">
                <label className="label">Select Your Primary Skill <span className="primary-text">*</span></label>
                <select
                  className="input-field bg-white"
                  name="primarySkill"
                  onChange={handleChange}
                  value={userData.primarySkill}
                  required
                >
                  <option value="" disabled selected>Select your primary skill</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="React">React</option>
                  <option value="Vue.js">Vue.js</option>
                  <option value="Angular">Angular</option>
                  <option value="Node.js">Node.js</option>
                  <option value="Python">Python</option>
                  <option value="Django">Django</option>
                  <option value="Flask">Flask</option>
                  <option value="Java">Java</option>
                  <option value="Spring Boot">Spring Boot</option>
                  <option value="C#">C#</option>
                  <option value=".NET">.NET</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                  <option value="SQL">SQL</option>
                  <option value="MongoDB">MongoDB</option>
                  <option value="AWS">AWS</option>
                  <option value="Docker">Docker</option>
                  <option value="Kubernetes">Kubernetes</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Figma">Figma</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>
              <div>
                <label className="label">Enter Your Total Year Of Experience <span className="primary-text">*</span></label>
                <input type="number" placeholder="Years of experience" name="yoe" className="input-field" onChange={handleChange} value={userData.yoe} required />
              </div>
              <button type="submit" className="btn-primary" onClick={moveTeNextStep}>Next</button>
            </form>
          </div>
        )}

        {activeStep === 3 && (
          <div className="flex flex-col">
            <h2 className="sub-heading mb-4">Resume And Preferences</h2>
            <p className="mb-4 text">Upload your resume and selet preferences.</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center p-4 h-[15vh] border border-[#CBD5E1] rounded-lg">
                {!userData.resume ? (
                  <>
                    <p className="flex items-center justify-center">
                      {FaFilePdf({ size: 25 }) as JSX.Element}
                    </p>
                    <h2 className="sub-heading">Upload Resume</h2>
                    <label htmlFor="resumeInput" className="text-sm text-center cursor-pointer">
                      Drop your file here (PDF) or <span className="primary-text underline">Browse</span>
                    </label>
                    <p className="text-xs text-gray-400 mt-1">Max file size: 2MB (PDF)</p>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-green-600 font-medium flex items-center gap-2">
                      {FaFilePdf({ size: 20 }) as JSX.Element} Resume uploaded!
                    </p>
                  </div>
                )}
                <input
                  id="resumeInput"
                  type="file"
                  accept="application/pdf"
                  name="resume"
                  className="hidden"
                  onChange={handlePdfChange}
                />
              </div>
              <div className="mt-4">
                <h2 className="sub-heading mb-4">Company Preferences</h2>
                <div className="mb-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    Global
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                    {[
                      { icon: FaGoogle({ size: 28 }) as JSX.Element, name: "Google" },
                      { icon: FaFacebookF({ size: 28 }) as JSX.Element, name: "Meta" },
                      { icon: FaAmazon({ size: 28 }) as JSX.Element, name: "Amazon" },
                      { icon: FaApple({ size: 28 }) as JSX.Element, name: "Apple" },
                      { icon: FaMicrosoft({ size: 28 }) as JSX.Element, name: "Microsoft" },
                    ].map((item, idx) => {
                      const isSelected = userData.companyPreferences.includes(item.name);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCompanyPreference(item.name)}
                          className={`flex flex-col items-center p-3 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-blue-100 border border-blue-500' : 'hover:bg-gray-100'
                            }`}
                        >
                          {item.icon}
                          <span className="text-sm mt-1">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <h4 className="font-semibold my-4">Startups</h4>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                  {[
                    { icon: SiFigma({ size: 28 }) as JSX.Element, name: "Figma" },
                    { icon: FaStripe({ size: 28 }) as JSX.Element, name: "Stripe" },
                    { icon: SiNotion({ size: 28 }) as JSX.Element, name: "Notion" },
                    { icon: FaAirbnb({ size: 28 }) as JSX.Element, name: "Airbnb" },
                    { icon: SiRobinhood({ size: 28 }) as JSX.Element, name: "Robinhood" },
                  ].map((item, idx) => {
                    const isSelected = userData.companyPreferences.includes(item.name);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCompanyPreference(item.name)}
                        className={`flex flex-col items-center p-3 px-12 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-blue-100 border border-blue-500 ' : 'hover:bg-gray-100'
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm mt-1">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
                <h4 className="font-semibold my-4">Pakistan</h4>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                  {[
                    { icon: FaDev({ size: 28 }) as JSX.Element, name: "Systems" },
                    { icon: FaDev({ size: 28 }) as JSX.Element, name: "Netsol" },
                    { icon: FaDev({ size: 28 }) as JSX.Element, name: "Devsinc" },
                    { icon: FaDev({ size: 28 }) as JSX.Element, name: "Arbisoft" },
                    { icon: FaDev({ size: 28 }) as JSX.Element, name: "Confix" }
                  ].map((item, idx) => {
                    const isSelected = userData.companyPreferences.includes(item.name);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCompanyPreference(item.name)}
                        className={`flex flex-col items-center p-3 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-blue-100 border border-blue-500' : 'hover:bg-gray-100'
                          }`}
                      >
                        {item.icon}
                        <span className="text-sm mt-1">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button type="submit" className="btn-primary" onClick={moveTeNextStep}>Next</button>
            </form>
          </div>
        )}

        <p className="text mt-4 flex gap-1 text-center justify-center">
          Already have an account? <a href="/login" className="underline font-semibold">Sign In</a>
        </p>
      </div>
    </div>
  )
}