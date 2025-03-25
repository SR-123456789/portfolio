"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center">
      <div
        className={`transition-opacity duration-1000 ease-in-out text-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[#59ffd2] mb-4 font-mono">こんにちは、私は</p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-[#59ffd2] leading-tight">
          React Native × Next.js × AIで、
          <br />
          爆速アプリ開発を
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
          フルスタックエンジニア
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-400 mx-auto max-w-2xl">
          最短数日でモバイル・Webアプリを届けます。
        </p>
        <Button
          onClick={scrollToContact}
          className="bg-transparent hover:bg-[#59ffd2]/10 text-[#59ffd2] border-2 border-[#59ffd2] px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-md transition-all duration-300 group mx-auto"
        >
          お問い合わせ
          <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}

