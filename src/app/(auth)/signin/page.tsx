"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { motion } from "framer-motion"

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  async function handleSignin() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !password) return

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials") // You can replace this with `toast.error()`
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center px-4 text-white font-['Poppins']">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-8 py-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

        <Input
          placeholder="Username"
          ref={usernameRef}
          className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          variant="secondary"
          className="py-5 mt-2 text-lg hover:scale-[1.02] transition-all"
          onClick={handleSignin}
        >
          Sign in
        </Button>

        <p className="text-sm text-center text-white/50">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="underline cursor-pointer hover:text-white"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  )
}
