import { prisma } from "@/utils/db";
import { Props } from "@/utils/type";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)
    if (!userCookie.isAdmin) {
      return NextResponse.json({ msg: 'not authorized' }, { status: 401 })
    }
    const { admin } = (await request.json())
    if (admin === undefined) {
      return NextResponse.json({ msg: 'please send admin type' }, { status: 400 })
    }

    const userAdmin = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    })
    if (userAdmin?.id === userCookie.id) {
      return NextResponse.json({msg: "you cant upDown or upgrade you'r self"})
    }


    await prisma.user.update({
      where: {
        id: params.id
      },
      data: {
        isAdmin: admin,
      }
    })
    return NextResponse.json({ msg: 'success' }, { status: 200 })
  } catch {
    return NextResponse.json({ msg: 'internal server error' }, { status: 500 })
  }


}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)
    if (!userCookie.isAdmin) {
      return NextResponse.json({ msg: 'not authorized' }, { status: 401 })
    }
    

    const ckeckUser = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    })
    if (ckeckUser?.isAdmin) {
      return NextResponse.json({msg: 'not authorized'},{status: 401})
    }
    if (!ckeckUser) {
      return NextResponse.json({msg: 'user is not defind'},{status: 404})
    }
    if (ckeckUser?.id === userCookie.id) {
      return NextResponse.json({msg: "you cant delete you'r self"},{status: 401})
    }
    await prisma.user.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ msg: 'success' }, { status: 200 })
  } catch {
    return NextResponse.json({ msg: 'internal server error' }, { status: 500 })
  }
}