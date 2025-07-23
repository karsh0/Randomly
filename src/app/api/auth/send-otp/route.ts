import nodemailer from "nodemailer"
import { prisma } from "@prisma/index"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, username, password } = await req.json()
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  try {

    await prisma.user.upsert({
      where: { email },
      update: {
        otpCode: code,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      },
      create: {
        email,
        username,
        password,
        otpCode: code,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      },
    })
  } catch (e) {
    console.error("Prisma error:", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }


  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `"Anon" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your verification code is ${code}`,
  })

  return NextResponse.json({ message: "OTP sent" })
}
