"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { ArrowLeft, Copy, Delete, RefreshCw, Trash, Trash2 } from "lucide-react"
import { toast, Toaster } from "sonner"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Message } from "@/types/types"


export default function Dashboard() {
  const [acceptMessages, setAcceptMessages] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const session = useSession()
  const username = session.data?.user.username;
  const userLink = `https://anonymous-f6xv.vercel.app/u/${username}`

  const router = useRouter()
  const isUserLoggedOut = session.status === "unauthenticated"

  if (isUserLoggedOut) {
    router.replace('/')
  }


  const copyToClipboard = () => {
    navigator.clipboard.writeText(userLink)
    toast.success("Copied to clipboard")
  }

  const refreshMessages = async () => {
    const res = await fetch(`/api/messages`)
    const data = await res.json()
    setMessages(data)
  }

  const updateAccept = async () => {
    await fetch(`/api/accept-messages`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        acceptMessages
      }),
    })
  }

  const deleteMessage = async(id: string) =>{
    await fetch(`/api/delete-message`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      }),
    })
    refreshMessages()
  }

  useEffect(() => {
      refreshMessages()
  }, [])

  
  useEffect(()=>{
    updateAccept()
  },[acceptMessages])

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col md:flex-row justify-center items-start px-4 md:px-6 py-12 ">
      <motion.button
        className="bg-transparent cursor-pointer flex items-center"
        whileHover={{ x: -5 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft className="w-6 h-6 cursor-pointer hover:" onClick={() => router.push('/')} />
      </motion.button>
      <motion.div
        className="w-full max-w-4xl flex flex-col gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome back, <span className="text-white/90">{username}</span>
        </motion.h1>

        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label className="text-lg font-medium">Your anonymous message link</Label>
          <div className="relative">
            <Input
              className="bg-white/5 text-white border border-white/10 pr-12 py-7 text-xs md:text-lg"
              value={userLink}
              disabled
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Label className="text-md font-medium">Accept anonymous messages?</Label>
          <Switch
            checked={acceptMessages}
            onCheckedChange={()=>{
              setAcceptMessages(prev => !prev)
            }}
          />
        </motion.div>

        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <Button variant="ghost" size="icon" onClick={refreshMessages}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          className="grid gap-5 grid-cols-1 sm:grid-cols-2"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {messages.length === 0 ? (
            <motion.div
              className="text-gray-400 text-center col-span-full mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No messages received yet.
            </motion.div>
          ) : (
            messages.map((m, i) => (
              <motion.div
                key={i}
                className="w-full"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Card className="bg-white/5 relative border border-white/10 text-white transition-all hover:scale-[1.01] duration-300 rounded-2xl">
                  <Trash2 className="w-5 h-5 absolute top-3 right-5 cursor-pointer text-red-500" onClick={async()=>{
                    await deleteMessage(m.id)
                  }}/>
                  <CardContent className="px-4">
                    <div className="text-base">{m.text}</div>
                   <div className="text-xs text-zinc-300">{new Date(m.time).toLocaleDateString()}</div>

                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
      <Toaster />
    </div>
  )
}
