"use client"

import { useInView } from "react-intersection-observer"
import { Building } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ExperienceItem {
  company: string
  title?: {
    ja: string
    en: string
  }
  description: string[]
  note?: string
}

const experienceData: ExperienceItem[] = [
  {
    company: "大手IT企業",
    description: [
      "社内向けチャットアプリをVue / Laravelで開発。クリーンアーキテクチャやDDDを意識したフルスタック開発に従事。",
    ],
    note: "※フルタイムでの勤務ではありません",
  },
  {
    company: "メガベンチャー",
    description: [
      "モバイル決済アプリにおいて、PdMとして新機能（割り勘機能）の企画・立案・要件定義に従事。ウォーターフォールモデルによるプロダクト開発を経験。",
    ],
    note: "※フルタイムでの勤務ではありません",
  },
  {
    company: "株式会社Creative Grid",
    title: {
      ja: "CPO",
      en: "Chief Product Officer",
    },
    description: [
      "プロダクト立ち上げフェーズをリード。企画、技術選定、初期アーキテクチャ設計などを担当。現在はプロダクト開発フェーズに進んでおり、今後の機能設計・開発・チーム体制構築などにも携わる予定。",
    ],
  },
  {
    company: "フリーランス",
    description: [
      "Web・モバイルアプリのUI/UX設計、実装、API開発まで担当。Creative Gridの活動と並行して複数案件を遂行中。",
    ],
  },
]

export default function Experience() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience / 実務経験</h2>
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-[#1d3a6a] transform"></div>

        {experienceData.map((item, index) => (
          <ExperienceCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({
  item,
  index,
}: {
  item: ExperienceItem
  index: number
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div ref={ref} className={`relative mb-8 sm:mb-12 pl-12 sm:pl-20`}>
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 z-10">
        <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-[#1e54e7] flex items-center justify-center text-white">
          <Building className="h-4 w-4 sm:h-6 sm:w-6" />
        </div>
      </div>

      <div
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        style={{ transitionDelay: `${index * 0.2}s` }}
      >
        <div className="bg-[#112240] rounded-lg overflow-hidden shadow-lg p-4 sm:p-6">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.company}</h3>
            {item.title && (
              <p className="text-[#4e8cff] text-sm sm:text-base font-medium">
                - {item.title.ja} ({item.title.en})
              </p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            {item.description.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm sm:text-base text-gray-300 leading-relaxed"
                style={{
                  transitionDelay: `${i * 0.1 + 0.3}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {paragraph}
              </p>
            ))}

            {item.note && (
              <p
                className="text-xs sm:text-sm text-gray-400 italic mt-2"
                style={{
                  transitionDelay: `${0.5}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {item.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

