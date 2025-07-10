import { prisma } from "@prisma/index"
import { setSession } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  try {
    const user = await prisma.user.findFirst({
      where: { username, password, email_verified: true },
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const res = NextResponse.json({ message: "Signed in" })
    return setSession(res, { username: user.username })

  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }
}
