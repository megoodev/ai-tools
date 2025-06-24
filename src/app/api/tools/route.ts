import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import cloudinary from "@/utils/cloudinary";


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image');
    const name = formData.get('name');
    const link = formData.get('link');
    const categoryId = formData.get('categoryId');
    const description = formData.get('description');
    console.log(!name)
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 401 })
    }
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)
    if (!userCookie.isAdmin) {
      return NextResponse.json({ msg: 'not authorized' }, { status: 401 })
    }
    if (!name || !description || !link || !categoryId || !file) {
      return NextResponse.json(
        { msg: 'missing params' }, { status: 404 }
      )
    }
    if (!file) {
      return NextResponse.json({ msg: 'No file uploaded' }, { status: 400 });
    }

    const arraybuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arraybuffer);


    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString('base64')}`
    );

    const categoryExists = await prisma.category.findUnique(({
      where: {
        id: categoryId
      }
    }))

    if (!categoryExists) {
      return NextResponse.json(
        { msg: 'Category not found' }, { status: 400 }
      )
    }
    const tool = await prisma.tool.create({
      data: {
        name,
        description,
        link,
        imageTool: result.secure_url,
        categoryId,
      }
    })
    return NextResponse.json({ msg: 'The tool was Created Successfily', tool }, { status: 201 })


  } catch (error) {
    return NextResponse.json(
      { msg: 'internal server error', error },
      { status: 500 })
  }
}



export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    })
    return NextResponse.json({ tools }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ status: 500, error })
  }
}


