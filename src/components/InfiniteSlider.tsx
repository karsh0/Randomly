"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { SliderCard } from "./SliderCard"

type Props = {
  data: any[]
  direction?: "left" | "right"
  speed?: number // pixels per second
}

export function InfiniteSlider({
  data,
  direction = "left",
  speed = 50,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const xTransform = useTransform(x, (v) => `${v}px`)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const [contentWidth, setContentWidth] = useState(0)

  const start = () => {
    if (!contentWidth) return

    const current = x.get()
    const from = direction === "left" ? 0 : -contentWidth
    const to = direction === "left" ? -contentWidth : 0

    const distance = Math.abs(to - current)
    const totalDistance = Math.abs(to - from)
    const totalDuration = contentWidth / speed
    const remainingDuration = (distance / totalDistance) * totalDuration

    animationRef.current = animate(x, to, {
      duration: remainingDuration,
      ease: "linear",
      onComplete: () => {
        x.set(from) // reset back to start point
        start() // loop again
      },
    })
  }

  const stop = () => {
    animationRef.current?.stop()
  }

  useEffect(() => {
    if (!containerRef.current) return
    const width = containerRef.current.scrollWidth / 2
    setContentWidth(width)
  }, [data])

  useEffect(() => {
    if (!contentWidth) return
    start()
    return () => stop()
  }, [contentWidth, direction])

  return (
    <div className="relative overflow-hidden w-full">
      <div className="pointer-events-none absolute top-0 left-0 h-full md:w-xs bg-gradient-to-r from-black to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full md:w-xs bg-gradient-to-l from-black to-transparent z-20"></div>

      <motion.div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 px-4 sm:px-6"
        style={{ x: xTransform }}
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {[...data, ...data].map((user, i) => (
          <SliderCard key={i} {...user} />
        ))}
      </motion.div>
    </div>
  )
}
