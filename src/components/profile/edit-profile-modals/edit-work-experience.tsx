import React from "react";
import { EditWorkExperienceModalProps } from "../../../constants/interface";
import { industries } from "../../../constants/constants";
import { months } from "../../../constants/constants";
import { getYears } from "../../../helpers/helper";
import { userService } from "../../../services/user.service";
import { toast } from "react-toastify";

export const EditWorkExperienceModal: React.FC<EditWorkExperienceModalProps> = ({ setShowEditWorkExperienceModal }) => {
  const [workExperience, setWorkExperience] = React.useState({
    jobRole: "",
    employmentType: "",
    company: "",
    industry: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    currentlyWorking: false,
    location: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWorkExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const WorkExperience = {
      workExperience: [workExperience]
    }
    try {
      const email = localStorage.getItem("email");
      const login = await userService.updateUser(email, WorkExperience);
      if (login) {
        toast("Work experience updated successfully");
      }
      else {
        toast.error("Error in updating work experience");
      }
    }
    catch (error) {
      toast.error("Error during upadating work experience. Please try again.");
    }
  }

  React.useEffect(() => {
    console.log(workExperience)
  }, [workExperience]);

  return (
    <div className="p-7 bg-white rounded-md max-h-[98vh] overflow-y-auto scrollbar-thin">
      <h2 className="sub-heading mb-1">Edit Work Experience</h2>
      <p className="mb-4 text">Update your work details</p>
      <div className="flex flex-col gap-1">
        <label className="label">Job Role</label>
        <input type="text" placeholder="Job role" name="jobRole" className="input-field" onChange={handleChange} value={workExperience.jobRole} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Employment Type</label>
        <select
          name="employmentType"
          className="input-field bg-white"
          onChange={handleChange}
          value={workExperience.employmentType}
          required
        >
          <option value="" disabled>Select employment type</option>
          <option value="full time">Full Time</option>
          <option value="part time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="Freelance">freelance</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Company or Organization</label>
        <input type="text" placeholder="Company or Organization" name="company" className="input-field" onChange={handleChange} value={workExperience.company} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Industry</label>
        <select
          id="industry"
          name="industry"
          value={workExperience.industry}
          onChange={handleChange}
          className="input-field bg-white"
        >
          <option value="" disabled>Select an industry</option>
          {industries.map((industry, index) => (
            <option key={index} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row gap-3 mt-2">
        <div className="flex flex-col gap-1 w-[18rem]">
          <label className="label">Start Month</label>
          <select
            id="startMonth"
            name="startMonth"
            value={workExperience.startMonth}
            onChange={handleChange}
            className="input-field bg-white"
          >
            <option value="" disabled>Start Month</option>
            {months.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 w-[18rem]">
          <label className="label">Start Year</label>
          <select
            id="startYear"
            name="startYear"
            value={workExperience.startYear}
            onChange={handleChange}
            className="input-field bg-white"
          >
            <option value="" disabled>Start Year</option>
            {getYears(1980).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row gap-1 mt-2">
        <input type="checkbox" name="currentlyWorking"
          onChange={(e) =>
            setWorkExperience((prev) => ({
              ...prev,
              currentlyWorking: e.target.checked,
            }))
          } className="cursor-pointer" checked={workExperience.currentlyWorking} />
        <p>I'm currently working in this role</p>
      </div>

      <div className="flex flex-row gap-3 mt-1">
        <div className="flex flex-col gap-1 w-[18rem]">
          <label className="label">End Month</label>
          <select
            id="endMonth"
            name="endMonth"
            value={workExperience.endMonth}
            onChange={handleChange}
            className="input-field bg-white"
          >
            <option value="" disabled>End Month</option>
            {months.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 w-[18rem]">
          <label className="label">End Year</label>
          <select
            id="endYear"
            name="endYear"
            value={workExperience.endYear}
            onChange={handleChange}
            className="input-field bg-white"
          >
            <option value="" disabled>End Year</option>
            {getYears(1980).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Location</label>
        <input type="text" placeholder="Ex: Colombo, Sri Lanka" name="location" className="input-field" onChange={handleChange} value={workExperience.location} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Description</label>
        <textarea rows={4} placeholder="Description" name="description" className="input-field" onChange={handleChange} value={workExperience.description}></textarea>
      </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="cancel-button" onClick={() => setShowEditWorkExperienceModal(false)}>Cancel</button>
        <button type="submit" className="btn-primary !w-auto !px-10" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};