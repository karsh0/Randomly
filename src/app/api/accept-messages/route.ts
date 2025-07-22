import { prisma } from "@prisma/index";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "UnAuthenticated" },
            { status: 401 }
        )
    }

    const userId = session.user.id

    const user = await prisma.user.findFirst({
        where:{
            id: userId
        }
    })

     if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        )
    }


    return NextResponse.json({
        accept: user.accept
    })

}


export async function POST(req: NextRequest){
    const { acceptMessages } = await req.json()

     const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "UnAuthenticated" },
            { status: 401 }
        )
    }

    const userId = session.user.id

    const updatedUser = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            accept: acceptMessages
        }
    })

    if(!updatedUser){
        return NextResponse.json(
            { message:" Failed to find updated user" },
            { status: 404 }
        )
    }


    return NextResponse.json({
        message:'Message acceptance status updated successfully'
    })
}