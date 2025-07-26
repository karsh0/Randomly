import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@prisma/index";

export async function POST(req:NextRequest){
    const { username, otp } = await req.json()

    try{
        const user = await prisma.user.findFirst({
            where:{
                username,
                otpCode: otp
            }
        })

        if(!user){
            return NextResponse.json({
                message:"Invalid otp/email"
            }, {status: 400})
        }

        await prisma.user.update({
            where:{
                username
            },
            data:{
                email_verified: true,
                otpCode: null,
            }
        })
        

        return NextResponse.json(
            { message:"Email verified successfully" },
            { status: 200 }
        )


        
    }catch(e){
        return NextResponse.json({
            message:"Internal server error"
        }, {status: 500})
    }
}