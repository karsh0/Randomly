"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Copy, RefreshCw } from "lucide-react"
import { toast, Toaster } from "sonner"
import { getSession } from "@/lib/session"

type Message = {
  text: string
}

export default function Dashboard() {
  const [acceptMessages, setAcceptMessages] = useState(false)
  const [messages, setMessages] = useState([])

  const userLink = `http://localhost:3000/u/karan`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userLink)
    toast('Copied to clipboard')
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/messages`, {
        method: "GET",
        headers: {
          'Content-type': 'Application/json'
        },
      })

      const data = await res.json()
      console.log(data)
      setMessages(data)
    })()
  }, [])

  return (
    <div className="w-screen min-h-screen bg-black text-white flex justify-center items-start p-8">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">Welcome Back karan</h1>

        <div>
          <Label className="text-lg">Copy Your Unique Link</Label>
          <div className="relative mt-2">
            <Input
              className="bg-transparent pr-10"
              value={userLink}
              disabled
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Label className="text-md">Do you want to accept messages?</Label>
          <Switch
            checked={acceptMessages}
            onCheckedChange={setAcceptMessages}
          />
        </div>

        <div className="flex justify-end">
          <Button size="icon" variant="ghost">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-5 flex-wrap">
        {messages.map((m: Message) => (
          <Card className="bg-neutral-800 border-none text-white">
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-2">
                {m.text}
              </div>
            </CardContent>
          </Card>
        ))}
</div>

      </div>
      <Toaster />
    </div>
  )
}
