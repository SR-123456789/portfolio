"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Github, Twitter, Linkedin } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    return
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="section pb-20 sm:pb-32">
      <h2 className="section-title">Contact</h2>
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form - Takes 3 columns */}
          <div
            className={`md:col-span-3 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {isSubmitted ? (
              <div className="bg-[#112240] p-6 rounded-lg text-center animate-fade-in">
                <h3 className="text-xl font-semibold text-[#59ffd2] mb-2">ありがとうございます！</h3>
                <p className="text-base text-gray-300">メッセージを受け取りました。できるだけ早くご連絡いたします。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#59ffd2] mb-2">
                    お名前
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="お名前"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#112240] border-[#1d3a6a] focus:border-[#59ffd2] text-white p-3 rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#59ffd2] mb-2">
                    メールアドレス
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#112240] border-[#1d3a6a] focus:border-[#59ffd2] text-white p-3 rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#59ffd2] mb-2">
                    メッセージ
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="メッセージ"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-[#112240] border-[#1d3a6a] focus:border-[#59ffd2] text-white p-3 rounded-md min-h-[150px] w-full"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-transparent hover:bg-[#59ffd2]/10 text-[#59ffd2] border-2 border-[#59ffd2] py-4 rounded-md transition-all duration-300 group text-base flex items-center justify-center"
                >
                  {isSubmitting ? (
                    "送信中..."
                  ) : (
                    <>
                      準備中
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info - Takes 2 columns */}
          <div
            className={`md:col-span-2 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="bg-[#112240] p-6 rounded-lg h-full">
              <h3 className="text-2xl font-bold text-[#59ffd2] mb-6">お問い合わせ先</h3>

              <div className="space-y-4">
                <Link
                  href="mailto:prepan.suport@gmail.com"
                  className="flex items-center text-white hover:text-[#59ffd2] transition-colors p-2 -ml-2 rounded-md hover:bg-[#1d3a6a] group"
                >
                  <div className="h-10 w-10 rounded-full bg-[#1d3a6a] flex items-center justify-center mr-4 text-[#59ffd2] group-hover:bg-[#59ffd2] group-hover:text-[#0a192f] transition-all duration-300">
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg">prepan.suport@gmail.com</span>
                </Link>

                <Link
                  href="https://"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-[#59ffd2] transition-colors p-2 -ml-2 rounded-md hover:bg-[#1d3a6a] group"
                >
                  <div className="h-10 w-10 rounded-full bg-[#1d3a6a] flex items-center justify-center mr-4 text-[#59ffd2] group-hover:bg-[#59ffd2] group-hover:text-[#0a192f] transition-all duration-300">
                    <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg">GitHub</span>
                </Link>

                <Link
                  href="https://"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-[#59ffd2] transition-colors p-2 -ml-2 rounded-md hover:bg-[#1d3a6a] group"
                >
                  <div className="h-10 w-10 rounded-full bg-[#1d3a6a] flex items-center justify-center mr-4 text-[#59ffd2] group-hover:bg-[#59ffd2] group-hover:text-[#0a192f] transition-all duration-300">
                    <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg">LinkedIn</span>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1d3a6a]">
                <p className="text-gray-300">
                  お気軽にご連絡ください。プロジェクトのご相談、お仕事の依頼など、できるだけ早くご返信いたします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

