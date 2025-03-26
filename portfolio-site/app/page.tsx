export const runtime = 'edge';

import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import CodeRainBackground from "@/components/code-rain-background"
import TerminalEffect from "@/components/terminal-effect"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a192f] text-white overflow-hidden">
      <CodeRainBackground />
      <TerminalEffect />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  )
}

