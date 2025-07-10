import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@prisma/index";


export async function POST(req: NextRequest){
    const {username, password} = await req.json()

    if(!username || !password){
        return NextResponse.json({
            message:"Invalid fields"
        })
    }

    try{
        const user = await prisma.user.findFirst({
            where:{
                username,
                password
            }
        })
        
        if(!user){
            return NextResponse.json({
                message:"user not found"
            })
        }

        return NextResponse.json({
            message:"signin successfull"
        })
    }catch(e){
        console.log(e)
        return NextResponse.json({
            message:"Internal server error"
        })
    }
}