import React, { JSX } from "react";
import { colors } from "../../constants/constants";
import { Skill } from "../../constants/types";
import { userService } from "../../services/user.service";
import { toast } from "react-toastify";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer
} from 'recharts';
import {
  FaTrashAlt
} from 'react-icons/fa';

export const Skills: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>([]);
  const [percentage, setPercentage] = React.useState<number>(0);
  const [showChart, setShowChart] = React.useState(false);
  const RADIAN = Math.PI / 180;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skills = {
      skills: selectedSkills
    };
    try {
      const email = localStorage.getItem("email");
      const login = await userService.updateUser(email, skills);
      if (login) {
        toast("Skills updated successfully");
      }
      else {
        toast.error("Error in updating skills");
      }
    }
    catch (error) {
      toast.error("Error during upadating skills. Please try again.");
    }
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
    const skill = selectedSkills[index]?.skill;
    const level = selectedSkills[index]?.level;
    if (level <= 0) return null;

    return (
      <text x={x} y={y} fill="white" fontSize={10} textAnchor="middle" dominantBaseline="central"
      >
        {`${skill}`}
      </text>
    );
  };

  const handleAddSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;
    const level = 0;

    if (skill) {
      setSelectedSkills((prev: Skill[]) => {
        const exists = prev.find((s: Skill) => s.skill === skill);
        if (exists) {
          return prev.map((s: Skill) =>
            s.skill === skill ? { ...s, level } : s,
          );
        } else {
          return [...prev, { skill, level },];
        }
      });
      e.target.value = "";
    }
  };

  const handleLevelChange = (skillName: string, newLevel: number) => {
    setSelectedSkills(prev =>
      prev.map(skill =>
        skill.skill === skillName ? { ...skill, level: newLevel } : skill
      )
    );
  };

  const removeSkill = (name: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s.skill !== name));
  };

  React.useEffect(() => {
    const total = selectedSkills.reduce((acc, skill) => acc + Number(skill.level), 0);
    setPercentage(total);

    if (selectedSkills.length > 0 && total > 0) {
      const timer = setTimeout(() => setShowChart(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowChart(false);
    }
  }, [selectedSkills]);

  return (
    <main className="mx-auto px-[50px] md:px-[96px] lg:px-[96px] xl:px-[96px] py-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Technical Skills</h1>
      <p className="text-gray-600 mb-8 leading-relaxed xl:w-[45%] lg:w-[60%] w-full md:w-[75%] m-auto">
        Add 5-15 technical skills Use the sliders to set percentages in multiples of 5% for each skill The total must equal 100% before saving. Mark your primary skill with the star.
      </p>
      <div className="xl:w-[45%] lg:w-[60%] w-full md:w-[75%] flex flex-col items-center justify-center m-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full">
          {
            selectedSkills.length < 5 ? (
              <p className="block sm:inline">Please add at least 5 skills.</p>
            ) : (
              <p className="block sm:inline">All skills must have percentage greater than 0%.</p>
            )
          }
        </div>
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
      <div className="flex gap-2 mt-4 xl:w-[45%] lg:w-[60%] w-full md:w-[75%] m-auto flex-wrap">
        {
          selectedSkills.map((skill, index) => (
            <button key={index} onClick={() => removeSkill(skill.skill)} className="flex-shrink-0 px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">{skill.skill} x</button>
          ))
        }
      </div>
      <div className="relative w-full h-[300px] flex items-center justify-center">
        <div
          className={`absolute transition-all duration-300 ease-in-out ${showChart ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
        >
          <div className="w-[240px] h-[240px] rounded-full bg-gray-300" />
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${showChart ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
        >
          <ResponsiveContainer width={240} height={240}>
            <PieChart>
              <Pie
                data={selectedSkills}
                dataKey="level"
                nameKey="skill"
                cx="50%"
                cy="50%"
                outerRadius={120}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {selectedSkills.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.skill}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-4 xl:w-[45%] lg:w-[60%] w-full md:w-[75%] m-auto">
        {selectedSkills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#2b7a78' }}
                ></div>
                <span className="text-gray-800 font-semibold">{skill.skill}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-10 text-right font-semibold">{skill.level}%</span>
                <button onClick={() => removeSkill(skill.skill)}>
                  {FaTrashAlt({ size: 20, color: '#df584e' }) as JSX.Element}
                </button>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={skill.level}
              onChange={e =>
                handleLevelChange(skill.skill, Number(e.target.value))
              }
              className="w-full accent-teal-600"
            />
          </div>
        ))}
      </div>
      <div className="relative h-[200px]">
        <div className="absolute bottom-0 left-0 right-0 flex lg:flex-row md:flex-row sm:flex-row flex-col justify-center lg:gap-[20rem] md:gap-[12rem] sm:gap-[7rem] gap-3">
          <button className="cancel-button">Cancel</button>
          <button className="btn-primary !w-auto !px-10" onClick={handleSubmit}>Save Skills and Continue</button>
        </div>
      </div>
    </main>
  );
};