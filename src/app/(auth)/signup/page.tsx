"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

export default function Signup() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function handleSignup(data: any) {
    const { username, email, password } = data
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
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 font-['Poppins'] text-white">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <label className="block text-sm mb-1 text-white/70">Username</label>
            <Input
              {...register("username", { required: true })}
              className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">Username is required</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/70">Email</label>
            <Input
              type="email"
              {...register("email", { required: true })}
              className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/70">Password</label>
            <Input
              type="password"
              {...register("password", { required: true })}
              className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">Password is required</p>}
          </div>

          <Button
            variant="secondary"
            className="w-full py-5 text-lg hover:scale-[1.02] transition-all flex items-center justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </form>

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
