"use client"
import { useInView } from "react-intersection-observer"

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>
      <div
        ref={ref}
        className={`max-w-3xl transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-lg leading-relaxed mb-6">
          React NativeやNext.jsを中心に、Web・モバイル・バックエンドの開発に対応。
          AIを活用したスピード感のある開発を得意とし、プロダクト立ち上げから運用までサポート可能。
          企画力と実装力を兼ね備えた「技術×ビジネス」のハイブリッド型エンジニアです。
        </p>
      </div>
    </section>
  )
}

