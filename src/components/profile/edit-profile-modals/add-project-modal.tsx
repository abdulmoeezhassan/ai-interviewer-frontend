import React from "react";
import { AddProjectModalProps } from "../../../constants/interface";
import { months } from "../../../constants/constants";
import { getYears } from "../../../helpers/helper";
import { userService } from "../../../services/user.service";
import { toast } from "react-toastify";

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ setShowAddProjectModal }) => {
  const [addProjectData, setAddProjectData] = React.useState({
    projectName: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    currentlyWorking: false,
    link: "",
    description: "",
    technologiesUsed: [] as string[],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;

    if (skill) {
      setAddProjectData((prev) => {
        const updatedTechnologies = prev.technologiesUsed.includes(skill)
          ? prev.technologiesUsed
          : [...prev.technologiesUsed, skill];

        return {
          ...prev,
          technologiesUsed: updatedTechnologies,
        };
      });

      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projects = {
      projects: [addProjectData]
    }
    try {
      const email = localStorage.getItem("email");
      const login = await userService.updateUser(email, projects);
      if (login) {
        toast("Project added successfully");
      }
      else {
        toast.error("Error in adding project");
      }
    }
    catch (error) {
      toast.error("Error during adding project. Please try again.");
    }
  }

  const removeSkill = (name: string) => {
    setAddProjectData((prev) => ({
      ...prev,
      technologiesUsed: prev.technologiesUsed.filter((s) => s !== name),
    }));
  };

  return (
    <div className="p-7 bg-white rounded-md max-h-[98vh] overflow-y-auto scrollbar-thin w-full md:w-[80%] lg:w-[65%]">

      <h2 className="sub-heading mb-1">Add Project</h2>
      <p className="mb-4 text">Add key information about your project.</p>

      <div className="flex flex-col gap-1">
        <label className="label">Project Title <span className="primary-text">*</span></label>
        <input type="text" placeholder="Ex: Project Name" name="projectName" className="input-field" onChange={handleChange} value={addProjectData.projectName} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Link <span className="primary-text">*</span></label>
        <input type="text" placeholder="Ex: http://github.com/project/1234" name="link" className="input-field" onChange={handleChange} value={addProjectData.link} />
      </div>

      <div className="flex flex-row gap-3 mt-2">
        <div className="flex flex-col gap-1 w-full">
          <label className="label">Start Month</label>
          <select
            id="startMonth"
            name="startMonth"
            value={addProjectData.startMonth}
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
        <div className="flex flex-col gap-1 w-full">
          <label className="label">Start Year</label>
          <select
            id="startYear"
            name="startYear"
            value={addProjectData.startYear}
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
            setAddProjectData((prev) => ({
              ...prev,
              currentlyWorking: e.target.checked,
            }))
          }
          className="cursor-pointer"
          checked={addProjectData.currentlyWorking} />
        <p>I'm currently working on this project(Present)</p>
      </div>
      <div className="flex flex-row gap-3 mt-2">
        <div className="flex flex-col gap-1 w-full">
          <label className="label">End Month</label>
          <select
            id="endMonth"
            name="endMonth"
            value={addProjectData.endMonth}
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

        <div className="flex flex-col gap-1 w-full">
          <label className="label">End Year</label>
          <select
            id="endYear"
            name="endYear"
            value={addProjectData.endYear}
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
        <label className="label">Description</label>
        <textarea rows={4} placeholder="Add any additional details, activities or socities" name="description" className="input-field" onChange={handleChange} value={addProjectData.description}></textarea>
      </div>

      <div className="mt-2">
        <label className="label">Tech Stack</label>
        <select
          className="input-field bg-white"
          name="skill"
          onChange={handleAddSkill}
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

      <div className="flex gap-2 mt-2 flex-wrap">
        {
          addProjectData.technologiesUsed.map((skill, index) => (
            <button key={index} onClick={() => removeSkill(skill)} className="flex-shrink-0 px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">{skill} x</button>
          ))
        }
      </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="cancel-button" onClick={() => setShowAddProjectModal(false)}>Cancel</button>
        <button type="submit" className="btn-primary !w-auto !px-10" onClick={handleSubmit}>Confirm</button>
      </div>

    </div>
  );
};