"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = [
      "rgba(99, 102, 241, ",
      "rgba(139, 92, 246, ",
      "rgba(6, 182, 212, ",
      "rgba(244, 114, 182, ",
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }

      // Spawn particles
      for (let i = 0; i < 3; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 1,
          size: Math.random() * 4 + 2,
          color,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cursor = cursorRef.current

      // Draw main cursor glow
      const gradient = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 30)
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.6)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)")
      gradient.addColorStop(1, "rgba(99, 102, 241, 0)")

      ctx.beginPath()
      ctx.arc(cursor.x, cursor.y, 30, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw cursor core
      ctx.beginPath()
      ctx.arc(cursor.x, cursor.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fill()

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05 // gravity
        p.life -= 0.02
        p.size *= 0.98

        if (p.life <= 0) return false

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.life + ")"
        ctx.fill()

        return true
      })

      // Limit particles
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  )
}
