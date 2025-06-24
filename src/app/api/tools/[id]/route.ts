
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { prisma } from "@/utils/db";
import { Props } from "@/utils/type";


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
    const tool = await prisma.tool.findUnique({
      where: {
        id: params?.id
      }
    })
    if (!tool) {
      return NextResponse.json({ msg: 'the tool is not deifind' })
    }
    await prisma.tool.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ msg: 'User deleted successfuly' }, { status: 201 })


  } catch (error) {
    NextResponse.json(
      { msg: 'internal server error', error },
      { status: 500 })
  }
}

// export async function PUT(request: NextRequest, { params }: Props) {
//   try {
//     const cookie = request.cookies.get('jwtToken')
//     if (!cookie) {
//       return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
//     }
//     const userCookie = verify(cookie.value, process.env.JWT_SECRET)
//     if (!userCookie.isAdmin) {
//       return NextResponse.json({ msg: 'not authorized' }, { status: 401 })
//     }
//     const tool = await prisma.tool.findUnique({
//       where: {
//         id: params?.id
//       }
//     })
//     if (!tool) {
//       return NextResponse.json({ msg: 'the tool is not deifind' })
//     }
//     const { name, description, categoryId, link } = (await request.json())
//     const oldTool = await prisma.tool.findUnique({
//       where: {
//         id: params.id
//       }
//     })
//     await prisma.tool.update({
//       where: {
//         id: params.id
//       },
//       data: {
//         name: name || oldTool?.name,
//         description: description || oldTool?.description,
//         categoryId: categoryId || oldTool?.categoryId,
//         link: link || oldTool?.categoryId,
//       }
//     })
//     return NextResponse.json({ msg: 'success' }, { status: 201 })


//   } catch (error) {
//     NextResponse.json(
//       { msg: 'internal server error', error },
//       { status: 500 })
//   }
// }