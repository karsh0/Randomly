"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Verify({params}:{params: {username:string}}){

    const codeRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    async function verifyOTP(){
        const verification_code = codeRef.current?.value
        const { username } = await(params)

        const res = await fetch('/api/auth/verify-otp',{
            method:"POST",
             headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    otp:verification_code
                }),
        }) 

        const data = await res.json();
        console.log(data)

        if(res.ok){
            router.push('/signin')
        }
    }

    return <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
        <div className="w-xl flex flex-col gap-4">
            <span className="text-3xl font-semibold">Verification</span>
            <Input className="w-full border-gray-400 outline-none px-4 py-5" ref={codeRef} placeholder="Enter OTP"/>
            <Button className="py-5 text-lg" variant={"secondary"} onClick={verifyOTP}>Verify</Button>
        </div>
    </div>
}