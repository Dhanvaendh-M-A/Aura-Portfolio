"use client"

import { useEffect, useRef } from "react"

export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const orbs = container.querySelectorAll(".orb")

    orbs.forEach((orb, index) => {
      const el = orb as HTMLElement
      const duration = 8 + index * 2
      const delay = index * 1.5

      el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="orb absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)",
          top: "10%",
          left: "10%",
          filter: "blur(60px)",
        }}
      />
      <div 
        className="orb absolute w-80 h-80 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)",
          top: "60%",
          right: "15%",
          filter: "blur(60px)",
          animationDelay: "2s",
        }}
      />
      <div 
        className="orb absolute w-72 h-72 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%)",
          bottom: "20%",
          left: "40%",
          filter: "blur(60px)",
          animationDelay: "4s",
        }}
      />
      <div 
        className="orb absolute w-64 h-64 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.4), transparent 70%)",
          top: "30%",
          right: "30%",
          filter: "blur(60px)",
          animationDelay: "6s",
        }}
      />
    </div>
  )
}
