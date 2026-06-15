"use client"

import { useEffect, useRef, useState } from "react"

const chars = "!<>-_\/[]{}—=+*^?#________"

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number
}

export default function TextScramble({ text, className = "", delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const frameRef = useRef(0)
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number }>>([])
  const frameCounter = useRef(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const length = text.length
      queueRef.current = []

      for (let i = 0; i < length; i++) {
        queueRef.current.push({
          from: text[i],
          to: text[i],
          start: Math.floor(Math.random() * 40),
          end: Math.floor(Math.random() * 40) + 40,
        })
      }

      const update = () => {
        let output = ""
        let complete = 0

        for (let i = 0; i < length; i++) {
          const { from, to, start, end } = queueRef.current[i]
          let char = from

          if (frameCounter.current >= end) {
            complete++
            char = to
          } else if (frameCounter.current >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)]
              queueRef.current[i].from = char
            }
          }

          output += char
        }

        setDisplayText(output)

        if (complete === length) {
          cancelAnimationFrame(frameRef.current)
        } else {
          frameCounter.current++
          frameRef.current = requestAnimationFrame(update)
        }
      }

      update()
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frameRef.current)
    }
  }, [text, delay])

  return <span className={className}>{displayText}</span>
}
