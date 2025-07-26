"use client"

import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { verifyOTP } from "@/lib/auth"
import { toast, Toaster } from "sonner"
import { Loader2 } from "lucide-react"

export default function Verify() {
  const codeRef = useRef<HTMLInputElement | null>(null)
  const { username } = useParams()
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(false)

  async function handleVerify() {
    const otp = codeRef.current?.value?.trim() || ""
    if (!otp || !username) return

    setIsVerifying(true)

    const verified = await verifyOTP({ username: username.toString(), otp })

    setIsVerifying(false)

    if (verified) {
      router.push("/dashboard")
      toast.success("Email verified")
    } else {
      toast.error("Invalid OTP")
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center px-4 text-white">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center">Verify Your Email</h2>
        <p className="text-center text-white/60">
          Enter the 6-digit code sent to your email
        </p>

        <input
          ref={codeRef}
          placeholder="Enter OTP"
          className="w-full p-2 rounded-lg border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all"
        />

        <Button
          variant="secondary"
          className="w-full py-6 text-lg hover:scale-[1.01] transition-all flex items-center justify-center"
          onClick={handleVerify}
          disabled={isVerifying}
        >
          {isVerifying && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>

        <p className="text-sm text-center text-white/50">
          Didn’t receive the code?{" "}
          <span className="underline cursor-pointer hover:text-white">
            Resend
          </span>
        </p>
      </motion.div>
      <Toaster />
    </div>
  )
}
