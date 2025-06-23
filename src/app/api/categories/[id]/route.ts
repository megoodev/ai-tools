import { prisma } from "@/utils/db"
import { Props } from "@/utils/type"
import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

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
   
    if (!params.id) {
      return NextResponse.json({ msg: 'name param is missing' }, { status: 404 })
    }
    const categoryExist = await prisma.category.findUnique({
      where: {
        id: params.id
      }
    })
    if (!categoryExist) {
      return NextResponse.json({ msg: 'the category not found' }, { status: 404 })
    }
    await prisma.category.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ msg: 'success' }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
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
  
    const { name } = (await request.json())
    if (!name) {
      return NextResponse.json({ msg: 'name param is missing' }, { status: 404 })
    }
    const categoryExist = await prisma.category.findUnique({
      where: {
        id: params.id
      }
    })
    if (!categoryExist) {
      return NextResponse.json({ msg: 'the category not found' }, { status: 404 })
    }
     await prisma.category.update({
      where: {
        id: params.id
      },
      data: {
        name,
      }
    })

    return NextResponse.json({ msg: 'success' }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}