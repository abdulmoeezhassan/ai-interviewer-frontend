import React, { JSX } from "react";
import { tabs } from "../../../constants/constants";
import { toast } from "react-toastify";
import { EditProfileModalProps } from "../../../constants/interface";
import userService from "../../../services/user.service";
import {
  FaCloudUploadAlt,
  FaCamera,
} from "react-icons/fa";

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ setShowModal }) => {
  const [activeTab, setActiveTab] = React.useState<1 | 2 | 3>(1);
  const [userData, setUserData] = React.useState({
    firstName: '',
    lastName: '',
    location: '',
    englishProficiency: '',
    profilePicture: '',
    jobRole: '',
    yoe: '',
    level: '',
    bio: '',
    linkedInUrl: '',
    mediumUrl: '',
    twitterUrl: '',
    gitHubUrl: '',
    codePenUrl: '',
    hackerRankUrl: '',
    leetCodeUrl: '',
    personalWebsiteUrl: '',
    salaryExpectation: '',
    prefferedTimeZone: '',
    workPreference: '',
    noticePeriod: '',
  });

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      const login = await userService.updateUser(email, userData);
      if (login) {
        toast("Profile update successfully");
      }
      else {
        toast.error("Error in updating profile data");
      }
    }
    catch (error) {
      toast.error("Error during upadating profile. Please try again.");
    }
  }

  return (
    <div className="p-7 bg-white rounded-md max-h-[98vh] overflow-y-auto scrollbar-thin">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 1 | 2 | 3)}
            className={`px-3 py-1 rounded-md transition-colors
              ${activeTab === tab.id
                ? "bg-white text-gray-900 shadow"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 1 && (
          <div>
            <h2 className="sub-heading mb-1">Personal Details</h2>
            <p className="mb-4 text">You can update your profile details here.</p>
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
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">First Name</label>
                <input type="text" placeholder="First Name" name="firstName" className="input-field" onChange={handleChange} value={userData.firstName} />
              </div>
              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">Last Name</label>
                <input type="text" placeholder="Last Name" name="lastName" className="input-field" onChange={handleChange} value={userData.lastName} />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3 mt-2">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">Select Your Role</label>
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

              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">Select Your Experience Level</label>
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
            </div>

            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3 mt-2">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">Select Your English Proficiency Level</label>
                <select className="input-field bg-white" name="englishProficiency" onChange={handleChange} value={userData.englishProficiency}>
                  <option value="" disabled selected>Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="native">Native</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">Enter Your Total Year Of Experience <span className="primary-text">*</span></label>
                <input type="number" placeholder="Years of experience" name="yoe" className="input-field" onChange={handleChange} value={userData.yoe} required />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label className="label">Bio</label>
              <textarea placeholder="Tell us about yourself..." name="bio" rows={4} className="input-field" onChange={handleChange} value={userData.bio} ></textarea>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3 mt-2">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">LinkedIn</label>
                <input type="text" placeholder="Full LinkedIn Profile Url" name="linkedInUrl" className="input-field" onChange={handleChange} value={userData.linkedInUrl} />
              </div>
              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">Medium</label>
                <input type="text" placeholder="Full Medium Profile Url" name="mediumUrl" className="input-field" onChange={handleChange} value={userData.mediumUrl} />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3 mt-2">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">X(Twitter)</label>
                <input type="text" placeholder="Full X(Twitter) Profile Url" name="twitterUrl" className="input-field" onChange={handleChange} value={userData.twitterUrl} />
              </div>
              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">Github</label>
                <input type="text" placeholder="Full Github Profile Url" name="gitHubUrl" className="input-field" onChange={handleChange} value={userData.gitHubUrl} />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3 mt-2">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">Codepen</label>
                <input type="text" placeholder="Full Codepen Profile Url" name="codePenUrl" className="input-field" onChange={handleChange} value={userData.codePenUrl} />
              </div>
              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">HackerRank</label>
                <input type="text" placeholder="Full HackerRank Profile Url" name="hackerRankUrl" className="input-field" onChange={handleChange} value={userData.hackerRankUrl} />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-3 mt-2">
              <div className="flex flex-col gap-1 w-[18rem]">
                <label className="label">LeetCode</label>
                <input type="text" placeholder="Full LeetCode Profile Url" name="leetCodeUrl" className="input-field" onChange={handleChange} value={userData.leetCodeUrl} />
              </div>
              <div className="flex flex-col gap-1 mt-[2px] w-[18rem]">
                <label className="label">Personal Website URL</label>
                <input type="text" placeholder="Full Personal Website Url" name="personalWebsiteUrl" className="input-field" onChange={handleChange} value={userData.personalWebsiteUrl} />
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && <p>
          <h2 className="sub-heading mb-1">Salary Expectation</h2>
          <p className="mb-4 text">Please enter your expected salary amount below</p>

          <p className="text !mb-1">Your yearly expected salary in USD:<span className="primary-text">*</span></p>
          <input type="number" placeholder="Expected Salary" name="salaryExpectation" className="input-field !lg:w-[30rem] !md:w-[30rem] !w-full" onChange={handleChange} value={userData.salaryExpectation} required />
        </p>}
        {activeTab === 3 && (
          <div>
            <h2 className="sub-heading mb-1">Preferences</h2>
            <p className="mb-4 text">Please enter your working preferences</p>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-2 mt-2">

              <div className="mb-4">
                <label className="block font-medium mb-1">Timezone</label>
                <select
                  className="input-field bg-white !w-[18rem]"
                  value={userData.prefferedTimeZone}
                  name="prefferedTimeZone"
                  onChange={handleChange}
                >
                  <option value="">Select Timezone</option>
                  <option value="GMT">GMT</option>
                  <option value="UTC">UTC</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="PKT">PKT (Pakistan Standard Time)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Work Preference</label>
                <select
                  className="input-field bg-white !w-[18rem]"
                  value={userData.workPreference}
                  name="workPreference"
                  onChange={handleChange}
                >
                  <option value="">Select Preference</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-2 mt-2">
              <div className="mb-4">
                <label className="block font-medium mb-1">Current Location</label>
                <input
                  type="text"
                  placeholder="Enter Current Location"
                  name="location"
                  className="input-field !w-[18rem]"
                  value={userData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Notice Period</label>
                <select
                  className="input-field bg-white !w-[18rem]"
                  name="noticePeriod"
                  value={userData.noticePeriod}
                  onChange={handleChange}
                >
                  <option value="">Select notice period</option>
                  <option value="Immediately available">Immediately available</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button type="submit" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
          <button type="submit" className="btn-primary !w-auto !px-10" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
