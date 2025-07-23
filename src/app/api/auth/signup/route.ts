import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@prisma/index";

export async function POST(req: NextRequest){
    const {username, email, password} = await req.json()

    if(!username || !email || !password){
        return NextResponse.json(
            { message:"Invalid fields" },
            { status : 411 }
        )
    }

    try{
        await prisma.user.create({
            data:{
                username,
                email,
                password
            }
        })
        
        return NextResponse.json({
            message:"user created"
        })
    }catch(e){
        console.log(e)
        return NextResponse.json(
            { message:"Internal server error"},
            { status: 500 }
    )
    }
}