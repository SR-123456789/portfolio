"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Database,
  Server,
  Cpu,
  Monitor,
  Layers,
  Cloud,
  PenToolIcon as Tool,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  SiNestjs,
  SiDjango,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiPostgresql,
  SiDocker,
  SiRedux,
  SiApache,
  SiJquery,
  SiFlask,
  SiApple,
  SiArduino,
  SiApachecordova,
} from "react-icons/si";
import { DiDjango, DiPostgresql } from "react-icons/di";
import { FaAws, FaCloudflare, FaGit, FaGithub, FaJenkins, FaLaravel, FaPython, FaRaspberryPi, FaReact, FaSwift } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaDocker, FaGolang } from "react-icons/fa6";
import { IoLogoVercel } from "react-icons/io5";
import { AiFillOpenAI } from "react-icons/ai";



type SkillCategory = "all" | "frontend" | "backend" | "infra" | "other";

interface Skill {
  name: string;
  icon: string;
  color: string;
  category: SkillCategory;
}

const skillsData: Record<Exclude<SkillCategory, "all">, Skill[]> = {
  frontend: [
    {
      name: "React Native",
      icon: "react",
      color: "#61DAFB",
      category: "frontend",
    },
    { name: "Next.js", icon: "nextjs", color: "#000000", category: "frontend" },
    { name: "React", icon: "react", color: "#61DAFB", category: "frontend" },
    { name: "Redux", icon: "redux", color: "#764ABC", category: "frontend" },
    {
      name: "Tailwind CSS",
      icon: "tailwindcss",
      color: "#38B2AC",
      category: "frontend",
    },
    { name: "SwiftUI", icon: "swift", color: "#F05138", category: "frontend" },
    {
      name: "Cordova",
      icon: "cordova",
      color: "#E8E8E8",
      category: "frontend",
    },
    { name: "jQuery", icon: "jquery", color: "#0769AD", category: "frontend" },
  ],
  backend: [
    { name: "NestJS", icon: "nestjs", color: "#E0234E", category: "backend" },
    { name: "Django", icon: "django", color: "#092E20", category: "backend" },
    { name: "Flask", icon: "flask", color: "#000000", category: "backend" },
    { name: "Gin", icon: "go", color: "#00ADD8", category: "backend" },
    { name: "Laravel", icon: "laravel", color: "#FF2D20", category: "backend" },
    {
      name: "Firebase Functions",
      icon: "firebase",
      color: "#FFCA28",
      category: "backend",
    },
  ],
  infra: [
    { name: "Firebase", icon: "firebase", color: "#FFCA28", category: "infra" },
    { name: "AWS", icon: "aws", color: "#FF9900", category: "infra" },
    { name: "Docker", icon: "docker", color: "#2496ED", category: "infra" },
    { name: "Vercel", icon: "vercel", color: "#000000", category: "infra" },
    { name: "Apache", icon: "apache", color: "#000000", category: "infra" },
    {
      name: "Cloudflare",
      icon: "cloudflare",
      color: "#F38020",
      category: "infra",
    },
  ],
  other: [
    {
      name: "PostgreSQL",
      icon: "postgresql",
      color: "#336791",
      category: "other",
    },
    {
      name: "GitHub Actions",
      icon: "github",
      color: "#2088FF",
      category: "other",
    },
    { name: "CI/CD", icon: "git", color: "#F05032", category: "other" },
    { name: "CoreML", icon: "apple", color: "#000000", category: "other" },
    { name: "OpenAI API", icon: "openai", color: "#10a37f", category: "other" },
    {
      name: "Web Scraping",
      icon: "python",
      color: "#3776AB",
      category: "other",
    },
    { name: "Arduino", icon: "arduino", color: "#00979D", category: "other" },
    {
      name: "Raspberry Pi",
      icon: "raspberrypi",
      color: "#A22846",
      category: "other",
    },
  ],
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");
  const [isChanging, setIsChanging] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleTabChange = (tab: SkillCategory) => {
    if (tab === activeTab) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsChanging(false);
    }, 300);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "react":
        return <FaReact className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "nextjs":
        return <RiNextjsFill className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "redux":
        return <SiRedux className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "tailwindcss":
        return <RiTailwindCssFill className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "swift":
        return <FaSwift className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "apache":
        return <SiApache className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "jquery":
        return <SiJquery className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "nestjs":
        return <SiNestjs className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "django":
        return <DiDjango className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "flask":
        return <SiFlask className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "go":
        return <FaGolang className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "laravel":
        return <FaLaravel className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "firebase":
        return <SiFirebase className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "aws":
        return <FaAws className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "docker":
        return <FaDocker className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "vercel":
        return <IoLogoVercel className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "cloudflare":
        return <FaCloudflare className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "postgresql":
        return <DiPostgresql className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "github":
        return <FaGithub className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "git":
        return <FaGit className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "apple":
        return <SiApple className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "openai":
        return <AiFillOpenAI className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "python":
        return <FaPython className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "arduino":
        return <SiArduino className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "raspberrypi":
        return <FaRaspberryPi className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "jenkins":
        return <FaJenkins className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "cordova":
        return <SiApachecordova className="h-5 w-5 sm:h-6 sm:w-6" />;
      default:
        return <Tool className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  // Get all skills for the "all" tab
  const getAllSkills = () => {
    return [
      ...skillsData.frontend,
      ...skillsData.backend,
      ...skillsData.infra,
      ...skillsData.other,
    ];
  };

  // Get skills based on active tab
  const getFilteredSkills = () => {
    if (activeTab === "all") {
      return getAllSkills();
    }
    return skillsData[activeTab];
  };

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto">
          <div className="inline-flex bg-[#112240] p-1.5 rounded-full">
            {(
              [
                "all",
                "frontend",
                "backend",
                "infra",
                "other",
              ] as SkillCategory[]
            ).map((tab, index) => {
              const labels = {
                all: "All",
                frontend: "Frontend",
                backend: "Backend",
                infra: "Infra / Cloud",
                other: "Other",
              };

              return (
                <button
                  key={tab}
                  className={`px-4 sm:px-6 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[#4e8cff] text-white shadow-lg"
                      : "bg-transparent text-white hover:bg-[#1d3a6a] hover:text-[#59ffd2]"
                  }`}
                  onClick={() => handleTabChange(tab)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 transition-opacity duration-300 ${
            isChanging ? "opacity-0" : "opacity-100"
          }`}
        >
          {getFilteredSkills().map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="bg-[#112240] rounded-xl overflow-hidden shadow-lg hover:shadow-[#59ffd2]/20 transition-all duration-500 hover:translate-y-[-8px] group"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation:
                  inView && !isChanging
                    ? `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`
                    : "none",
              }}
            >
              <div className="p-3 sm:p-5 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#1d3a6a] flex items-center justify-center mb-2 sm:mb-3 text-[#59ffd2] group-hover:text-white group-hover:bg-[#59ffd2] transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                  {getIconComponent(skill.icon)}
                </div>
                <span className="font-medium text-sm sm:text-base text-white group-hover:text-[#59ffd2] transition-colors duration-300">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
