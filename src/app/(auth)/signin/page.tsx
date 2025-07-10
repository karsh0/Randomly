"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Signin() {

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()
    
    async function handleSignin() {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        const res = await fetch('/api/auth/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if(res.ok){
            router.push('/dashboard')
        }
    }

    return <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
        <div className="w-xl flex flex-col gap-4">
            <span className="text-3xl font-semibold">Signin Anonymous</span>
            <Input className="w-full border-gray-400 outline-none px-4 py-5" placeholder="Enter your username" ref={usernameRef} />
            <Input className="w-full border-gray-400 outline-none px-4 py-5" placeholder="Enter your password" ref={passwordRef} />
            <Button className="py-5 text-lg" variant={"secondary"} onClick={handleSignin}>Signin</Button>
        </div>
    </div>
}