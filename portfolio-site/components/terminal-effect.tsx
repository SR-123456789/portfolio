"use client"

import { useEffect, useRef, useState } from "react"

export default function TerminalEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Terminal commands
    const commands = [
      "npm install",
      "git commit -m 'Update portfolio'",
      "yarn build",
      "docker-compose up -d",
      "ssh user@server",
      "cd projects/portfolio",
      "ls -la",
      "vim app.tsx",
      "npx create-next-app",
      "firebase deploy",
      "vercel --prod",
      "curl https://api.example.com",
      "sudo apt update",
      "mkdir new-project",
      "touch .env",
      "echo $PATH",
      "grep -r 'function' .",
      "cat package.json",
      "node server.js",
      "python script.py",
    ]

    let currentCommand = ""
    let typingIndex = 0
    let commandIndex = Math.floor(Math.random() * commands.length)
    let typingSpeed = 100 // ms per character
    const waitAfterCommand = 2000 // ms to wait after command is typed
    let isWaiting = false
    let waitStartTime = 0

    // Cursor blink effect
    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = (timestamp: number) => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Position terminal at bottom left
      const padding = 20
      const terminalX = padding
      const terminalY = canvas.height - padding - 30

      // Draw prompt - 透明度を下げる
      ctx.font = "14px monospace"
      ctx.fillStyle = "rgba(89, 255, 210, 0.3)" // 透明度を下げる
      ctx.fillText("$ ", terminalX, terminalY)

      // Draw current command - 透明度を下げる
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)" // 透明度を下げる
      ctx.fillText(currentCommand, terminalX + 15, terminalY)

      // Draw cursor - 透明度を下げる
      if (cursorVisible) {
        const cursorX = terminalX + 15 + ctx.measureText(currentCommand).width
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)" // 透明度を下げる
        ctx.fillRect(cursorX, terminalY - 12, 8, 16)
      }

      // 以下は変更なし
      // Handle typing animation
      if (!isWaiting) {
        if (typingIndex < commands[commandIndex].length) {
          if (timestamp % typingSpeed < 16) {
            // Add next character
            currentCommand += commands[commandIndex][typingIndex]
            typingIndex++
          }
        } else {
          // Command finished typing
          isWaiting = true
          waitStartTime = timestamp
        }
      } else if (timestamp - waitStartTime > waitAfterCommand) {
        // Reset for next command
        isWaiting = false
        currentCommand = ""
        typingIndex = 0
        commandIndex = (commandIndex + 1) % commands.length
        typingSpeed = 70 + Math.random() * 100
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
      clearInterval(cursorBlinkInterval)
    }
  }, [cursorVisible])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
}

