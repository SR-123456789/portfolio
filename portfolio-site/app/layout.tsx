import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Full-Stack Engineer Web,Nativeの受託開発",
  description: "React Native × Next.js × AIで、爆速アプリ開発を",
  keywords: [
    "React Native",
    "Next.js",
    "AI開発",
    "フルスタックエンジニア",
    "受託開発",
    "爆速開発",
  ],
  icons: {
    icon: "/min-icon.png",               
    shortcut: "/min-icon.png",           
    apple: "/min-icon.png",     
  },
  themeColor: "#0a192f",
  openGraph: {
    title: "Full-Stack Engineer Web,Nativeの受託開発",
    description: "React Native × Next.js × AIで、爆速アプリ開発を",
    url: "https://devrequest.prep-an.com", // ← 適宜変更
    siteName: "React Native × Next.js × AIで、爆速アプリ開発を",
    images: [
      {
        url: "https://devrequest.prep-an.com/splash.png",
        width: 1200,
        height: 630,
        alt: "Full-Stack Engineer",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Engineer Web,Nativeの受託開発",
    description: "React Native × Next.js × AIで、爆速アプリ開発を。",
    images: ["https://devrequest.prep-an.com/splash.png"],
    creator: "@your_twitter_id", // 任意で追加
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <meta name="google-site-verification" content="yMQxDYVklkdhT0tm_D2LQowaX4jseIHRteUI6VRZuu8" />
      <Analytics/>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'