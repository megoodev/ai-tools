import { prisma } from "@/utils/db";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        tools: true
      }
    })
    return NextResponse.json({ status: 200, categories })

  } catch (error) {
    return NextResponse.json({ status: 500, error })
  }
}
export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)
    if (!userCookie.isAdmin) {
      return NextResponse.json({ msg: 'not authorized' }, { status: 401 })
    }

    const { name } = (await request.json())
    if (!name) {
      return NextResponse.json({ msg: 'name param is missing' }, { status: 404 })
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
      include: {
        tools: true
      }
    })
    return NextResponse.json({ msg: 'The category was created successfly', category }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
