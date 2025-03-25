"use client"

import { useEffect, useRef } from "react"

interface CodeSymbol {
  x: number
  y: number
  value: string
  speed: number
  opacity: number
  fontSize: number
  length: number // 文字の引き伸ばし長さ
}

export default function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const symbolsRef = useRef<CodeSymbol[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Programming symbols, keywords, and syntax
    const codeElements = [
      // Programming symbols
      "{",
      "}",
      "(",
      ")",
      "[",
      "]",
      "<",
      ">",
      ";",
      "=",
      "==",
      "===",
      "=>",
      "->",
      "!=",
      "!==",
      // JavaScript/TypeScript keywords
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "interface",
      "type",
      "extends",
      "implements",
      "async",
      "await",
      "try",
      "catch",
      "throw",
      "new",
      // React specific
      "useState",
      "useEffect",
      "useRef",
      "useContext",
      "useMemo",
      "useCallback",
      "React.FC",
      "props",
      "children",
      // HTML/JSX elements
      "<div>",
      "</div>",
      "<span>",
      "</span>",
      "<p>",
      "</p>",
      "<h1>",
      "</h1>",
      "<button>",
      "</button>",
      // CSS properties
      "display: flex",
      "position: absolute",
      "margin: 0",
      "padding: 10px",
      "color: #59ffd2",
      "background: #0a192f",
      // Next.js specific
      "getStaticProps",
      "getServerSideProps",
      "useRouter",
      "next/link",
      "next/image",
      // Common variable names
      "data",
      "result",
      "response",
      "error",
      "loading",
      "isValid",
      "handleSubmit",
      "onChange",
      "onClick",
      // Code snippets
      "const [state, setState] = useState()",
      "useEffect(() => {}, [])",
      "export default function",
      "return <div></div>",
      "import React from 'react'",
      "fetch('/api/data')",
      ".then(res => res.json())",
    ]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initSymbols()
    }

    const initSymbols = () => {
      const symbols: CodeSymbol[] = []
      const columns = Math.floor(canvas.width / 15) // Approximate width per symbol

      for (let i = 0; i < columns; i++) {
        symbols.push({
          x: i * 15 + Math.random() * 10 - 5,
          y: Math.random() * canvas.height * 2 - canvas.height,
          value: getRandomCodeElement(),
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.05,
          fontSize: Math.random() * 4 + 10,
          length: Math.random() * 15 + 5, // 引き伸ばし長さをランダムに設定
        })
      }

      symbolsRef.current = symbols
    }

    const getRandomCodeElement = () => {
      return codeElements[Math.floor(Math.random() * codeElements.length)]
    }

    const animate = () => {
      // 背景を元の紺色に戻す
      ctx.fillStyle = "#0a192f"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      symbolsRef.current.forEach((symbol, index) => {
        // 引き伸ばしエフェクトを描画
        drawStretchedSymbol(ctx, symbol)

        // Move symbol down
        symbol.y += symbol.speed

        // Reset if off screen
        if (symbol.y > canvas.height + 50) {
          symbol.y = -20 - Math.random() * 100
          symbol.x = Math.random() * canvas.width
          symbol.value = getRandomCodeElement()
          symbol.speed = Math.random() * 2 + 1
          symbol.opacity = Math.random() * 0.3 + 0.05
          symbol.length = Math.random() * 15 + 5 // 引き伸ばし長さを再設定
        }

        // Randomly change some symbols
        if (Math.random() < 0.002) {
          symbol.value = getRandomCodeElement()
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // 引き伸ばしエフェクトを描画する関数
    const drawStretchedSymbol = (ctx: CanvasRenderingContext2D, symbol: CodeSymbol) => {
      // メイン文字を描画
      ctx.font = `${symbol.fontSize}px monospace`
      ctx.fillStyle = `rgba(89, 255, 210, ${symbol.opacity * 0.5})`
      ctx.fillText(symbol.value, symbol.x, symbol.y)

      // 引き伸ばしエフェクト（残像）を描画
      const steps = 10 // 残像の数
      for (let i = 1; i <= steps; i++) {
        const fadeOpacity = symbol.opacity * 0.5 * (1 - i / steps) // 徐々に透明になる
        const stretchY = symbol.y - (i * symbol.length) / steps // 上方向に伸ばす

        ctx.fillStyle = `rgba(89, 255, 210, ${fadeOpacity})`

        // 文字の種類によって引き伸ばし方を変える
        if (symbol.value.length <= 2) {
          // 短い文字は単純に引き伸ばす
          ctx.fillText(symbol.value, symbol.x, stretchY)
        } else {
          // 長い文字は一部だけ表示して引き伸ばし感を出す
          const partLength = Math.max(1, Math.floor(symbol.value.length * (1 - i / (steps * 2))))
          const partText = symbol.value.substring(0, partLength)
          ctx.fillText(partText, symbol.x, stretchY)
        }
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
}

