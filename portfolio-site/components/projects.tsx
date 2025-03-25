"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type ProjectCategory = "all" | "mobile" | "web" | "other"

interface Technology {
  name: string
  color?: string
}

interface Project {
  title: string
  description: string
  image: string
  technologies: Technology[]
  link?: string
  category: ProjectCategory | ProjectCategory[]
}

const projectsData: Project[] = [
  {
    title: "BadEasyTranslator",
    description: "英語学習特化型モバイルアプリ（React Native / CoreML / OCR）",
    image: "/bad-easy-main.png?height=200&width=100",
    technologies: [{ name: "React Native" }, { name: "CoreML" }, { name: "raspberrypi" },{name:"phi3.5 mini"}],
    link: "https://badeasy-translator.prep-an.com",
    category: "mobile",
  },
  {
    title: "歩くアルパカ+R",
    description: "学生生活支援アプリ（時間割, SNS）",
    image: "/arupaka-main.png?height=200&width=400",
    technologies: [{ name: "React Native" }, { name: "Firebase" },{name:"Nest"},{name:"Django"}, { name: "Redux" }],
    link: "https://apps.apple.com/us/app/%E5%A4%A7%E5%AD%A6%E7%94%9F%E6%B4%BB%E6%94%AF%E6%8F%B4%E3%82%A2%E3%83%97%E3%83%AAfor%E7%AB%8B%E5%91%BD%E9%A4%A8-%E6%AD%A9%E3%81%8F%E3%82%A2%E3%83%AB%E3%83%91%E3%82%AB-r/id6499567971",
    category: "mobile",
  },
  {
    title: "リツフレ",
    description: "学内マッチングSNS",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [{ name: "React Native" }, { name: "Firebase" }, { name: "Nest.js" }],
    link: "https://apps.apple.com/jp/app/%E3%83%AA%E3%83%84%E3%83%95%E3%83%AC-%E7%AB%8B%E5%91%BD%E9%A4%A8%E5%A4%A7%E5%AD%A6%E5%90%91%E3%81%91%E5%AD%A6%E5%86%85sns/id6636493917",
    category: "mobile",
  },
  {
    title: "警察落とし物検索",
    description: "スクレイピング×SpringBoot",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [{ name: "SpringBoot" }, { name: "Web Scraping" }, { name: "Java" }],
    category: "web",
  },
  {
    title: "ポートフォリオサイト",
    description: "Next.js × Tailwind CSSで構築した個人ポートフォリオです。1日で作成しました。",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [{ name: "Next.js" }, { name: "Tailwind CSS" }],
    category: "web",
  },
  {
    title: "オンプレサーバー",
    description: "nativeアプリのバックエンドRestAPIサーバー",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [{ name: "インフラ" }, { name: "Python" }, { name: "Jenkins" }],
    category: "other",
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "all") return true
    if (Array.isArray(project.category)) {
      return project.category.includes(activeCategory)
    }
    return project.category === activeCategory
  })

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Project Filter Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex bg-[#112240] p-1.5 rounded-full">
            {(["all", "mobile", "web", "other"] as ProjectCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#4e8cff] text-white shadow-lg"
                    : "bg-transparent text-white hover:bg-[#1d3a6a] hover:text-[#59ffd2]"
                }`}
              >
                {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="rounded-lg overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden bg-gray-200 rounded-t-lg">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6 bg-[#0f1729] rounded-b-lg flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech.name} className="px-3 py-1 text-xs font-medium bg-[#1a2747] text-[#4e8cff] rounded-full">
                {tech.name}
              </span>
            ))}
          </div>
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-[#1a2747] text-sm font-medium rounded-md text-white hover:bg-[#1a2747] transition-colors w-fit"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Site
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

