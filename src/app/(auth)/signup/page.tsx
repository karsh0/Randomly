"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function Signup() {

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    async function handleSignup() {
        const username = usernameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        const res = await fetch('/api/auth/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        })

        const data = await res.json()

        console.log(data)
        try {

            const res2 = await fetch('/api/auth/send-otp', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })
            const data2 = await res2.json()
            console.log(data2)
        }
        catch (e) {
            console.log(e)
        }

        router.push(`/verify/${username}`)
    }

    return <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
        <div className="w-xl flex flex-col gap-4">
            <span className="text-3xl font-semibold">Join Anonymous</span>
            <Input className="w-full border-gray-400 outline-none px-4 py-5" placeholder="Enter your username" ref={usernameRef} />
            <Input className="w-full border-gray-400 outline-none px-4 py-5" placeholder="Enter your email" ref={emailRef} />
            <Input className="w-full border-gray-400 outline-none px-4 py-5" placeholder="Enter your password" ref={passwordRef} />
            <Button className="py-5 text-lg" variant={"secondary"} onClick={handleSignup}>Signup</Button>
        </div>
    </div>
}