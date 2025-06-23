import { prisma } from "@/utils/db";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)
    if (!userCookie.isAdmin) {
      return NextResponse.json({ msg: 'not authorized' }, { status: 401 })
    }
    const users = await prisma.user.findMany({
      select: {
        email:true,
        username: true,
        image: true,
        isAdmin: true,
        id: true
      }
    })
    return NextResponse.json({ data: users }, { status: 200 })
  } catch {
    NextResponse.json({ error: 'internal server error' }, { status: 500 })
  }
}