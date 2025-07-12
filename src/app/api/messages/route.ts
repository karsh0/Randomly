import { prisma } from "@prisma/index";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.username) {
            return NextResponse.json(
                { message: "Unauthorized: user not found in session" },
                { status: 401 }
            );
        }

        const username = session.user.username;

        const user = await prisma.user.findFirst({
            where: { username },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const messages = await prisma.message.findMany({
            where: { userId: user.id },
        });

        return NextResponse.json(messages);
    } catch (e) {
        console.error("Error fetching messages:", e);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
