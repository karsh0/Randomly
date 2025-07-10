"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"

export default async function PublicProfile({username}:{username: string}) {
    const messageRef = useRef<HTMLTextAreaElement | null>(null)

    async function sendMessage(){
        const message = messageRef.current?.value
        const res = await fetch('/api/send-message',{
            method:"POST",
            headers:{
                'Content-type':'Application/json'
            },
            body:JSON.stringify({
                username,
                message
            })
        })


        if(res.ok){
            toast.success('Message sent successfully')
        }
    }

    return (
        <div className="w-screen min-h-screen bg-black text-white flex justify-center items-start p-8">
            <div className="w-full max-w-3xl flex flex-col gap-8">
                <h1 className="text-4xl font-bold text-center">Public Profile Link</h1>

                <div className="w-full flex flex-col gap-4">
                    <Label className="text-lg">Send Anonymous Message to @{username}</Label>
                    <Textarea
                        className="bg-transparent h-40"
                        placeholder="Enter your messages"
                        ref={messageRef}
                        />
                    <Button
                        size="icon"
                        variant="secondary"
                        className="w-full"
                        onClick={sendMessage}
                    >Send message
                    </Button>
                </div>

            </div>
            <Toaster />
        </div>
    )
}
