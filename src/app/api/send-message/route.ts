import { prisma } from "@prisma/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { username , message} = await req.json()

    if(!username || !message){
        return NextResponse.json({
            message:"Invalid fields"
        },{ status: 411 })
    }

    try{
        const user = await prisma.user.findFirst({
            where:{
                username
            }
        })
        
        if(!user){
            return NextResponse.json({
                message:"user not found"
            },{status: 404})
        }

        const userId = user.id;

        const m = await prisma.message.create({
            data:{
                userId,
                text: message
            }
        })

        console.log(m)

        return NextResponse.json(
            {message:"message sent successfully"}
        ) 
    }catch(e){
        return NextResponse.json({
            message:"Internal server error"
        },{ status:500 })
    }
} 