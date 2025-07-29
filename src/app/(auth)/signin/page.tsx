"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { toast, Toaster } from "sonner"

export default function Signin() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function handleSignin(data: any) {
    const { username, password } = data
    if (!username || !password) return

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/dashboard",
    })

    if (res?.ok) {
      router.push("/dashboard")
    } else {
      toast.error("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-gray-100 dark:bg-white/5 backdrop-blur-lg border border-gray-300 dark:border-white/10 rounded-2xl p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-4">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleSubmit(handleSignin)}>
          <div>
            <label className="block text-sm mb-1 text-gray-800 dark:text-white/70">Username</label>
            <input
              {...register("username", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-white/40 transition-all"
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">Username is required</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-800 dark:text-white/70">Password</label>
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
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-white/50">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="underline cursor-pointer hover:text-black dark:hover:text-white"
          >
            Sign up
          </span>
        </p>
      </motion.div>
      <Toaster />
    </div>
  )
}
