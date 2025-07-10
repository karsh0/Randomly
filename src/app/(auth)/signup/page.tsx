"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  async function handleSignup() {
    const username = usernameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !email || !password) return

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })

    if (!res.ok) {
      alert("Signup failed")
      return
    }

    // send OTP
    try {
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      })
    } catch (e) {
      console.error("OTP send failed", e)
    }

    router.push(`/verify/${username}`)
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center px-4 text-white font-['Poppins']">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-8 py-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center">Create Your Account</h2>

        <Input
          placeholder="Username"
          ref={usernameRef}
          className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
        />
        <Input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
        />
        <Input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
        />

        <Button
          variant="secondary"
          className="py-5 text-lg hover:scale-[1.02] transition-all"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <p className="text-sm text-center text-white/50">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="underline cursor-pointer hover:text-white"
          >
            Sign in
          </span>
        </p>
      </motion.div>
    </div>
  )
}
