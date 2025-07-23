"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"
import { useRef } from "react"
import { motion } from "framer-motion"
import { verifyOTP } from "@/lib/auth"

export default function Verify() {
  const codeRef = useRef<HTMLInputElement | null>(null)
  const { username } = useParams()
  const router = useRouter()

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center px-4 text-white font-['Poppins']">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-8 py-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center">Verify Your Email</h2>
        <p className="text-center text-white/60 text-sm">
          Enter the 6-digit code sent to your email
        </p>

        <Input
          ref={codeRef}
          placeholder="Enter OTP"
          className="bg-white/10 border border-white/20 placeholder-white/50 text-white focus-visible:ring-0"
        />

        <Button
          variant="secondary"
          className="py-5 text-lg hover:scale-[1.02] transition-all"
          onClick={async() => {
            const otp = codeRef.current?.value?.trim() || ""
            if (username && otp) {
              await verifyOTP({ username: username.toString(), otp })
              router.push('/dashboard')
            }
          }}
        >
          Verify
        </Button>


        <p className="text-sm text-center text-white/50">
          Didn’t receive the code?{" "}
          <span className="underline cursor-pointer hover:text-white">
            Resend
          </span>
        </p>
      </motion.div>
    </div>
  )
}
