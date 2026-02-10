import { prisma } from "@prisma/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { username } = await req.json()

    try{
        const user = await prisma.user.findUnique({
            where:{
                username
            }
        })

        if(user){
            return NextResponse.json({
                message:"Username already exists",
                success: false
            })
        }

        return NextResponse.json({
            message:"Username is unique",
            success: true
        })

    }catch(e){
        return NextResponse.json(
            { message:"Internal server error", e },
            { status: 500 }
        )
    }
}