"use client"

import { SliderCard } from "@/components/SliderCard"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { sampleUsers } from "@/lib/sample"

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative w-screen h-screen bg-black text-white font-['Poppins'] overflow-hidden">

      <motion.div
        className="absolute bottom-[-200px] left-[50%] -translate-x-1/2 rounded-full bg-red-400/20 w-[900px] h-[900px] blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <header className="w-full px-8 md:px-20 py-6 flex justify-between items-center z-10 relative">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Anonymous
        </motion.h1>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="rounded-2xl px-6 py-2 transition-all hover:scale-105"
            variant="secondary"
            onClick={() => router.push("/signin")}
          >
            Login
          </Button>
        </motion.div>
      </header>

      <main className="flex flex-col items-center justify-center h-[60vh] text-center px-6 relative z-10">
        <motion.div
          className="max-w-4xl space-y-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Dive into the world of anonymous messages.
          </h2>
          <p className="text-lg text-white/70">
            Where your identity remains secret.
          </p>
          <Button
            variant="secondary"
            className="px-7 py-5 transition-transform hover:scale-105"
            onClick={() => router.push("/signup")}
          >
            Get Started
          </Button>
        </motion.div>
      </main>

      <motion.div
        className="w-full flex justify-center gap-8 flex-wrap px-6 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {
          sampleUsers.map(user => (
            <SliderCard name={user.name} handle={user.handle} message={user.message} />
          ))
        }
      </motion.div>
    </div>
  )
}
