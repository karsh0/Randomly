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

    // Determine starting and ending x values
    const from = direction === "left" ? 0 : -contentWidth
    const to = direction === "left" ? -contentWidth : 0

    x.set(from)

    animationRef.current = animate(x, to, {
      duration: contentWidth / speed,
      ease: "linear",
      onComplete: start,
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
    <div className="overflow-hidden w-full">
      <motion.div
        ref={containerRef}
        className="flex gap-6 px-6"
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
