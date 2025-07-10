import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function setSession(res: NextResponse,user: { username: string }) {
  res.cookies.set("session", JSON.stringify(user), {
    httpOnly: true,
  })

  return res
}

export async function getSession() {
  const cookie = (await cookies()).get("session")
  console.log(cookie)
  if (!cookie) return null

  try {
    return JSON.parse(cookie.value)
  } catch {
    console.log('erroe in cookie')
    return null
  }
}

export async function clearSession() {
  (await cookies()).delete("session")
}
