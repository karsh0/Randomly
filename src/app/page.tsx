"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, useAnimation } from "framer-motion"
import { questions, sampleUsers, sampleUsers2 } from "@/lib/sample"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { InfiniteSlider } from "@/components/InfiniteSlider"
import { QuestionCard } from "@/components/QuestionCard"
import { Github, MoonIcon, Sun, Twitter } from "lucide-react"
import { useDarkMode } from "@/hooks/useDarkMode"

export default function Home() {
  const router = useRouter()
  const { status } = useSession()
  const isLoggedIn = status === "authenticated"
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, []);


  return (
    <div className="min-h-screen dark:bg-black  dark:text-white overflow-hidden">
      <header className="w-full px-5 md:px-20 py-6 flex justify-between items-center z-10 relative">
        <motion.h1
          className="text-xl md:text-2xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Randomly
        </motion.h1>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-5 items-center"
        >
          {isDarkMode ? <Sun onClick={toggleDarkMode}/> : <MoonIcon onClick={toggleDarkMode}/>}
          {
            isLoggedIn ? <Button
              className="rounded-2xl px-4 md:px-6 py-2 transition-all hover:scale-[1.02] bg-red-500 text-white hover:bg-red-600"
              variant="secondary"
              onClick={() => {
                signOut()
              }}
            >
              Logout
            </Button> : <Button
              className="rounded-2xl px-4 md:px-6 py-2 transition-all hover:scale-[1.02]"
              variant="default"
              onClick={() => router.push("/signin")}
            >
              Login
            </Button>
          }
        </motion.div>
      </header>

      <main className="flex flex-col items-center justify-center h-[58vh] text-center pt-10 px-6 relative z-10">
        <motion.div
          className="max-w-4xl space-y-3"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-7xl font-bold leading-tighter tracking-tight">
            Dive into the World of Anonymous Messages.
          </h2>
          <p className="text-sm md:text-lg dark:text-white/90">
            Where your identity remains secret.
          </p>
          <Button
            variant="default"
            className="relative z-20 px-7 py-5 hover:scale-[1.02] overflow-hidden"
            onClick={() => {
              isLoggedIn ? router.push('/dashboard') : router.push('/signup')
            }}
          >
            <span className="relative z-20">Get Started</span>
          </Button>
        </motion.div>
      </main>

      <motion.div className="flex flex-col gap-5 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}>

        <InfiniteSlider data={sampleUsers} direction="left" />
        <InfiniteSlider data={sampleUsers2} direction="right" />
      </motion.div>

      <div className="flex flex-col justify-center items-center py-20 md:py-30 px-5 mx-auto gap-5">
        <span className="text-4xl md:text-6xl text-center font-semibold mb-10">Receive Instant Messages</span>

        {questions.map((q, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale:0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{opacity:0, scale:0}}
            transition={{
              duration: 0.6,
              delay: idx * 0.25,
              type: "spring",
              stiffness: 350,
              damping: 40,
            }}
          >
            <QuestionCard
              avatar={q.avatar}
              color={q.color}
              question={q.question}
              timestamp={q.timestamp}
            />
          </motion.div>
        ))}
      </div>


      <footer className="w-full px-6 py-4 flex items-center justify-between dark:text-white text-sm dark:bg-black">
        <span className="font-bold">
          Randomly
        </span>

        <span className="hidden sm:block dark:text-white/80 text-center">
          Designed and Developed by{" "}
          <a
            href="https://github.com/karsh0"
            className="text-orange-400 underline hover:text-orange-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Karan
          </a>
        </span>

        <div className="flex gap-4 text-white text-lg">
          <a
            href="https://github.com/karsh0/anonymous"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Github className="dark:text-white text-black"/>
          </a>
          <a
            href="https://x.com/Karan_tw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Twitter className="dark:text-white text-black"/>
          </a>
        </div>
      </footer>

    </div>
  )
}


