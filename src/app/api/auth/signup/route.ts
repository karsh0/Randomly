import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@prisma/index";
import { hash } from "bcrypt"

export async function POST(req: NextRequest){
    const {username, email, password} = await req.json()

    if(!username || !email || !password){
        return NextResponse.json(
            { message:"Invalid fields" },
            { status : 411 }
        )
    }

    try{
        const hashedPassword = await hash(password, 5);
        await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
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