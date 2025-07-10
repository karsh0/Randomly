import { getSession } from "@/lib/session";
import { prisma } from "@prisma/index";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){

    const session = await getSession()
    const username = session.username

    console.log(username)
     
    if(!username){
        return NextResponse.json({
            message:"user not found"
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

        const messages = await prisma.message.findMany({
            where:{
                userId
            }
        })

        return NextResponse.json(
            messages
        ) 
    }catch(e){
        return NextResponse.json({
            message:"Internal server error"
        },{ status:500 })
    }
} 