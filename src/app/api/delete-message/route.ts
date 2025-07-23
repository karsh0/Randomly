import { prisma } from "@prisma/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { id } = await req.json()

    try{
        await prisma.message.delete({
            where:{ id }
        })

        return NextResponse.json(
            { message: "Message deleted!" }
        )
    }catch(e){
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}