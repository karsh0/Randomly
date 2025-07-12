import { prisma } from "@prisma/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { username, otp } = await req.json()

    try{
        const user = await prisma.user.findFirst({
            where:{
                username,
                otpCode: otp
            }
        })

        if(user){
            await prisma.user.update({
                where:{
                    username
                },
                data:{
                    email_verified: true,
                    otpCode: '123123',
                }
            })
        }

        if(!user){
            return NextResponse.json({
                message:"Invalid otp/email"
            }, {status: 400})
        }

    }catch(e){
        return NextResponse.json({
            message:"Internal server error"
        }, {status: 500})
    }
}