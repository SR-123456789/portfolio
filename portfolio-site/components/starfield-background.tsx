"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

interface MousePosition {
  x: number
  y: number
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationFrameRef = useRef<number>(0)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const resizeCanvas = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const stars: Star[] = []
      const starCount = Math.floor((canvas.width * canvas.height) / 2500)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.5 + 0.3,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        })
      }

      starsRef.current = stars
    }

    const drawGlow = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, "rgba(10, 25, 47, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a192f")
      gradient.addColorStop(1, "#061224")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle glow around mouse position
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        drawGlow(mousePosition.x, mousePosition.y, 150, "rgba(89, 255, 210, 0.03)")
      }

      // Draw stars
      starsRef.current.forEach((star, index) => {
        // Calculate distance from mouse for parallax effect
        const dx = mousePosition.x - star.x
        const dy = mousePosition.y - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
        const parallaxFactor = 0.015 * (1 - distance / maxDistance)

        // Update star position with parallax
        if (mousePosition.x > 0 && mousePosition.y > 0) {
          star.x += dx * parallaxFactor
          star.y += dy * parallaxFactor
        }

        // Update star pulse
        star.pulse += star.pulseSpeed
        if (star.pulse > Math.PI * 2) {
          star.pulse = 0
        }

        // Calculate pulsing opacity
        const pulsingOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.pulse))

        // Draw star with glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(89, 255, 210, ${pulsingOpacity})`
        ctx.fill()

        // Add subtle glow to larger stars
        if (star.size > 1.2) {
          drawGlow(star.x, star.y, star.size * 4, `rgba(89, 255, 210, ${pulsingOpacity * 0.2})`)
        }

        // Move star
        star.y += star.speed

        // Reset star position if it goes off screen
        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          star.y = 0
          star.x = Math.random() * canvas.width
          star.size = Math.random() * 2 + 0.5
          star.speed = Math.random() * 0.05 + 0.01
        }
      })

      // Draw subtle grid lines with wave effect
      const time = Date.now() * 0.001
      ctx.strokeStyle = "rgba(89, 255, 210, 0.03)"
      ctx.lineWidth = 0.5

      // Horizontal lines with wave
      for (let y = 0; y < canvas.height; y += 70) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 5) {
          const waveY = y + Math.sin(x * 0.01 + time) * 5
          if (x === 0) {
            ctx.moveTo(x, waveY)
          } else {
            ctx.lineTo(x, waveY)
          }
        }
        ctx.stroke()
      }

      // Vertical lines with wave
      for (let x = 0; x < canvas.width; x += 70) {
        ctx.beginPath()
        for (let y = 0; y < canvas.height; y += 5) {
          const waveX = x + Math.sin(y * 0.01 + time) * 5
          if (y === 0) {
            ctx.moveTo(waveX, y)
          } else {
            ctx.lineTo(waveX, y)
          }
        }
        ctx.stroke()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mousePosition.x, mousePosition.y])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
}

