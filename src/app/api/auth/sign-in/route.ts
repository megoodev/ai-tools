import { prisma } from "@/utils/db";
import { generateToken, payload } from "@/utils/generateToken";
import { compare } from "bcrypt";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  if (request.method !== "POST") NextResponse.json({ error: 'this method is not allowed' })
  try {
    const { email, password } = (await request?.json())
    if (!email || !password) {
      return NextResponse.json({ error: 'missing' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true
      }
    })
    if (!user) {
      return NextResponse.json({ status: 404, error: 'this email is not exist' },)
    }
    const passwordValid = await compare(password, user?.password)
    if (passwordValid) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          username: true,
          email: true,
          image: true,
          isAdmin: true,
        }
      })
    
      const jwtPayload: payload = {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        isAdmin: user?.isAdmin
      }
      const token = generateToken(jwtPayload)
      const cookie = serialize('jwtToken', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === 'production',
      })
      return NextResponse.json({ user: user }, {
        status: 200,
        headers: { 'set-cookie': cookie }
      })
    } else {
      return NextResponse.json({ error: 'wrong data' })
    }
  } catch (error) {
    return NextResponse.json({ error })
  }
}