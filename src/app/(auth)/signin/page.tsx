"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

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
      alert("Invalid credentials")
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center px-4 text-white font-['Poppins']">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit(handleSignin)} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-white/70">Username</label>
            <Input
              {...register("username", { required: true })}
              className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">Username is required</p>}
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
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

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
