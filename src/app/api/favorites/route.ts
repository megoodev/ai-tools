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
    const favorite = await prisma.user.findUnique({
      where: {
        id: userCookie.id
      },
      select: {
        favorite: true
      }
    })
    return NextResponse.json({ data: favorite?.favorite }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: 'internel server error', error }, { status: 500 })
  }
}












