"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { sendOTP } from "@/lib/auth"
import { toast, Toaster } from "sonner"
import { useState } from "react"

export default function Signup() {
  const router = useRouter()
  const [isUnique, setIsUnique] = useState(false)
  const [loading, setLoading] = useState(false)

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
    } else {
      toast.success("Signup successful")
    }

    try {
      await sendOTP({ email, username, password })
    } catch (e) {
      console.error("OTP send failed", e)
    }

    router.push(`/verify/${username}`)
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center px-4 text-black dark:text-white">
      <motion.div
        className="w-full max-w-md bg-gray-100 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Create an Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              {...register("username", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-white/40 transition-all"
              onChange={async (e) => {
                setLoading(true)

                const userResponse = await fetch("/api/get-username", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username: e.target.value }),
                })

                const userResponseData = await userResponse.json()

                setLoading(false)

                if (userResponse.ok && e.target.value !== "" && userResponseData.success === true) {
                  setIsUnique(true)
                } else {
                  setIsUnique(false)
                }
              }}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">Username is required</p>}
            {loading && <Loader2 className="mt-1 animate-spin" />}
            {isUnique && !loading && <div className="text-green-500 text-sm mt-1">Username is unique</div>}
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-white/40 transition-all"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-white/40 transition-all"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">Password is required</p>}
          </div>

          <Button
            variant="default"
            className="w-full py-6 text-lg hover:scale-[1.01] transition-all flex items-center justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-white/50">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="underline cursor-pointer hover:text-black dark:hover:text-white"
          >
            Sign in
          </span>
        </p>
      </motion.div>
      <Toaster />
    </div>
  )
}
