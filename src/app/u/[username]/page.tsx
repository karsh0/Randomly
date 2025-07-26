"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useRef } from "react"


export default function PublicProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()


  const { username } = useParams()
  const acceptRef = useRef(false)

  async function isAccepted(){
    const res = await fetch('/api/accept-messages')
    const data = await res.json()
    const accept = data.accept
    return accept
  }
  
  async function sendMessage(data: any) {
    acceptRef.current = await isAccepted()

    if(acceptRef.current === false){
      toast.error("Failed to send message. Try again.")
      return;
    }

    const message = data.message?.trim()

    if (!message) {
      toast.error("Message cannot be empty")
      return
    }

    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        message,
      }),
    })

    if (res.ok) {
      toast.success("Message sent successfully!")
      reset()
    } else {
      toast.error("Failed to send message. Try again.")
    }
  }

  return (
    <div className="w-screen min-h-screen bg-black text-white flex justify-center items-start px-6 py-20">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          Send a message
        </h1>

        <form onSubmit={handleSubmit(sendMessage)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-lg">Anonymous Message to @{username}</Label>
            <Textarea
              className="bg-white/5 text-lg border border-white/10 text-white placeholder-white/50 focus-visible:ring-1 focus-visible:ring-white/30 h-40"
              placeholder="Type your message here..."
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p className="text-sm text-red-500">Message is required</p>
            )}
          </div>

          <Button
            variant="secondary"
            type="submit"
            className="w-full py-6 text-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
      <Toaster richColors />
    </div>
  )
}
