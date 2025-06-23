import { prisma } from "@/utils/db"
import { Props } from "@/utils/type"
import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: Props) {

  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)

    const tool = await prisma.tool.findUnique(
      {
        where: {
          id: params.id
        }
      }
    )

    await prisma.user.update({
      where: {
        id: userCookie.id
      },
      data: {
        favorite: {
          
          connect: { id: tool?.id }
        },
      },
      include: {
        favorite: true
      }
    })
    return NextResponse.json({ msg: 'success' }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ msg: 'internel server error', error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {

  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)

    const tool = await prisma.tool.findUnique(
      {
        where: {
          id: params.id
        }
      }
    )
    if (!tool) {
      return NextResponse.json({ msg: 'tool not defind' }, { status: 403 })
    }
    await prisma.user.update({
      where: {
        id: userCookie.id
      },
      data: {
        favorite: {
          disconnect: { id: tool?.id }
        },
      },
      include: {
        favorite: true
      }
    })
    return NextResponse.json({ msg: 'success' }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ msg: 'internel server error', error }, { status: 500 })
  }
}