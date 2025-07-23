import React, { JSX } from "react";
import { EditProfileModal } from "./edit-profile-modals/edit-user-modal";
import { EditWorkExperienceModal } from "./edit-profile-modals/edit-work-experience";
import { AddCertificationModal } from "./edit-profile-modals/add-certification-modal";
import { AddProjectModal } from "./edit-profile-modals/add-project-modal";
import { Navbar } from "../navbar";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/context";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  HiOutlinePencil,
  HiOutlineBriefcase
} from "react-icons/hi2";
import {
  HiOutlinePlus,
  HiOutlineAcademicCap,
  HiOutlineLink
} from "react-icons/hi";

export const Profile: React.FC = () => {
  const naviagte = useNavigate();
  const context = React.useContext(userContext);
  const { userData } = context ?? {};
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [showEditWorkExperienceModal, setShowEditWorkExperienceModal] = React.useState<boolean>(false);
  const [showAddCertificationModal, setShowAddCertificationModal] = React.useState<boolean>(false);
  const [showAddProjectModal, setShowAddProjectModal] = React.useState<boolean>(false);
  const [isImageError, setIsImageError] = React.useState<boolean>(false);

  return (
    <>
      <Navbar />
      <div className="p-2 lg:px-[180px] md:px-[100px] px-4 overflow-y-auto">
        <div className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top">
          <p
            className="flex gap-1 justify-end font-bold text-sm"
            onClick={() => setShowModal(true)}
          >
            Edit
            <span>
              {HiOutlinePencil({ size: 16 }) as JSX.Element}
            </span>
          </p>

          <div className="flex items-center gap-4">
            {userData?.profilePicture && !isImageError ? (
              <img
                src={`${process.env.REACT_APP_API_URL}${userData.profilePicture}`}
                alt="profile"
                className="w-[98px] h-[98px] rounded-full object-cover"
                onError={() => setIsImageError(true)}
              />
            ) : (
              <span className="text-gray-200">{FaUserCircle({ size: 80 }) as JSX.Element}</span>
            )}
            <div>
              <h2 className="text-2xl font-bold flex items-center">{`${userData?.firstName} ${userData?.lastName}`}</h2>
              <p className="text-gray-700">
                {userData?.jobRole} • {userData?.level}
              </p>
              <p className="text-gray-700 text-sm">{userData?.email}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <p className="font-semibold">Expected Salary</p>
              <p className="user-info-box">
                ${userData?.salaryExpectation}
              </p>
            </div>

            <div>
              <p className="font-semibold">Preferred Timezones</p>
              <p className="user-info-box">
                {userData?.prefferedTimeZone}
              </p>
            </div>

            <div>
              <p className="font-semibold">Work Preferences</p>
              <p className="user-info-box">
                {userData?.workPreference}
              </p>
            </div>

            <div>
              <p className="font-semibold">Current Location</p>
              <p className="user-info-box">
                {userData?.location}
              </p>
            </div>

            <div>
              <p className="font-semibold">Notice Period</p>
              <p className="user-info-box">
                {userData?.noticePeriod}
              </p>
            </div>
          </div>
        </div>

        <div
          className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top"
          onClick={() => setShowModal(true)}
        >
          <div className="flex justify-between">
            <h1 className="font-bold">
              Profile Bio
            </h1>
            <p className="flex gap-1 justify-end font-bold text-sm">
              Edit
              <span>
                {HiOutlinePencil({ size: 16 }) as JSX.Element}
              </span>
            </p>
          </div>
          <p className="text-gray-600 text-sm capitalize">{userData?.bio}</p>
        </div>

        <div
          className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top"
          onClick={() => setShowModal(true)}
        >
          <div className="flex justify-between">
            <h1 className="font-bold">
              Skills
            </h1>
            <p className="flex gap-1 justify-end font-bold text-sm" onClick={() => naviagte("/skills")}>
              Edit
              <span>
                {HiOutlinePencil({ size: 16 }) as JSX.Element}
              </span>
            </p>
          </div>
          {
            userData?.skills.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-2 mt-3">
                <h3 className="font-semibold text-sm">Add your skills</h3>
                <button className="cancel-button"
                  onClick={() => naviagte("/skills")}
                >Add skills</button>
              </div>
            )
          }
          <div className="flex flex-row gap-4 mt-4">
            {(userData?.skills as { skill: string }[])?.map((skill) => <div key={skill.skill} className="capitalize flex h-[34px] p-[10px] justify-center items-center gap-[10px] rounded-[5px] border border-[#DBDBDA] bg-white shadow-sm">{skill.skill}</div>)}
          </div>
        </div>

        <div
          className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top"
        >
          <div className="flex justify-between">
            <h1 className="font-bold">
              Work Experience
            </h1>
            <p className="flex gap-1 justify-end font-bold text-sm"
              onClick={() => setShowEditWorkExperienceModal(true)}
            >
              Add
              <span>
                {HiOutlinePlus({ size: 16 }) as JSX.Element}
              </span>
            </p>
          </div>
          {
            userData?.workExperience.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-2 mt-3">
                <h3 className="font-semibold text-sm">Add your work experience</h3>
                <button className="cancel-button"
                  onClick={() => setShowEditWorkExperienceModal(true)}
                >Add experience</button>
              </div>
            )
          }
          {
            userData?.workExperience?.map((work: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 flex items-start gap-4 shadow-sm mt-4"
              >
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md">
                  <span className="text-gray-600">{HiOutlineBriefcase({ size: 60 }) as JSX.Element}</span>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 capitalize">
                    {work.company} • {work.jobRole}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {work.startMonth} {work.startYear} –{" "}
                    {work.currentlyWorking
                      ? "Present"
                      : `${work.endMonth || "N/A"} ${work.endYear || ""}`}
                  </p>
                  <p className="text-sm text-gray-500 capitalize mt-1">
                    {work.location || "N/A"} • {work.industry || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button className="flex items-center font-bold gap-1 text-sm text-black hover:underline">
                    Edit<span>{HiOutlinePencil({ size: 14 }) as JSX.Element}</span>
                  </button>
                  <button className="flex items-center font-bold gap-1 text-sm text-red-600 hover:underline">
                    Delete <span>{RiDeleteBin6Line({ size: 14 }) as JSX.Element}</span>
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <div
          className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top"
        >
          <div className="flex justify-between">
            <h1 className="font-bold">
              Licenses & Certifications
            </h1>
            <p className="flex gap-1 justify-end font-bold text-sm"
              onClick={() => setShowAddCertificationModal(true)}
            >
              Add
              <span>
                {HiOutlinePlus({ size: 16 }) as JSX.Element}
              </span>
            </p>
          </div>
          {
            userData?.certifications.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-2 mt-3">
                <h3 className="font-semibold text-sm">Add your certificates or qualifications</h3>
                <button className="cancel-button"
                  onClick={() => setShowAddCertificationModal(true)}
                >Add Certificate</button>
              </div>
            )
          }

          {
            userData?.certifications.map((certification: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 flex items-start gap-4 shadow-sm mt-4"
              >
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md">
                  <span className="text-gray-600">{HiOutlineAcademicCap({ size: 60 }) as JSX.Element}</span>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 capitalize">
                    {certification?.certificationName}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {certification?.issuingOorganization}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {certification?.issueDate}
                  </p>
                  <p className="text-sm text-gray-600 capitalize mt-1">
                    Credential ID: {certification?.credentialId}
                  </p>
                  <p className="text-sm text-gray-600 capitalize mt-1">
                    {certification?.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button className="flex items-center font-bold gap-1 text-sm text-black hover:underline">
                    Edit<span>{HiOutlinePencil({ size: 14 }) as JSX.Element}</span>
                  </button>
                  <button className="flex items-center font-bold gap-1 text-sm text-red-600 hover:underline">
                    Delete <span>{RiDeleteBin6Line({ size: 14 }) as JSX.Element}</span>
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <div
          className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top"
        >
          <div className="flex justify-between">
            <h1 className="font-bold">
              Projects
            </h1>
            <p className="flex gap-1 justify-end font-bold text-sm"
              onClick={() => setShowAddProjectModal(true)}
            >
              Add
              <span>
                {HiOutlinePlus({ size: 16 }) as JSX.Element}
              </span>
            </p>
          </div>
          {
            userData?.projects.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-2 mt-3">
                <h3 className="font-semibold text-sm">Add your projects</h3>
                <button className="cancel-button"
                  onClick={() => setShowAddProjectModal(true)}
                >Add Projects</button>
              </div>
            )
          }

          {
            userData?.projects?.map((project: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 flex items-start gap-4 shadow-sm mt-4"
              >
                <div className="flex-1">
                  <p className="text-lg font-bold capitalize">
                    {project?.projectName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {project?.startMonth} {project?.startYear} –{" "}
                    {project?.currentlyWorking
                      ? "Present"
                      : `${project?.endMonth || "N/A"} ${project?.endYear || ""}`}
                  </p>
                  <p className="text-sm text-gray-600 capitalize mt-1">
                    {project?.description}
                  </p>
                  <div className="flex flex-row gap-4 mt-4">
                    {(project?.technologiesUsed)?.map((skill: any, index: number) => <div key={index} className="capitalize flex h-[34px] p-[10px] justify-center items-center gap-[10px] rounded-[5px] border border-[#DBDBDA] bg-white shadow-sm">{skill}</div>)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <a href={project?.link} target="_blank" rel="noreferrer" className="flex items-center font-bold gap-1 text-sm hover:underline">
                    View Project <span>{HiOutlineLink({ size: 14 }) as JSX.Element}</span>
                  </a>
                  <button className="flex items-center font-bold gap-1 text-sm text-black hover:underline">
                    Edit<span>{HiOutlinePencil({ size: 14 }) as JSX.Element}</span>
                  </button>
                  <button className="flex items-center font-bold gap-1 text-sm text-red-600 hover:underline">
                    Delete <span>{RiDeleteBin6Line({ size: 14 }) as JSX.Element}</span>
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <div
          className="border border-[#CBD5E1] lg:p-8 md:p-5 p-4 rounded-md cursor-pointer profile-boxes-margin-top"
        >
          <div>
            <h1 className="font-bold">
              Interview Results
            </h1>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-2">
          <EditProfileModal setShowModal={setShowModal} />
        </div>
      )}

      {showEditWorkExperienceModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-2">
          <EditWorkExperienceModal setShowEditWorkExperienceModal={setShowEditWorkExperienceModal} />
        </div>
      )}

      {showAddCertificationModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-2">
          <AddCertificationModal setShowAddCertificationModal={setShowAddCertificationModal} />
        </div>
      )}

      {showAddProjectModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-2">
          <AddProjectModal setShowAddProjectModal={setShowAddProjectModal} />
        </div>
      )}
    </>
  );
};
