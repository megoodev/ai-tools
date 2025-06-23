
import cloudinary from '@/utils/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/db';
import { verify } from 'jsonwebtoken';



export async function PUT(request: NextRequest) {
  try {
    const cookie = request.cookies.get('jwtToken')
    if (!cookie) {
      return NextResponse.json({ msg: 'you are not token' }, { status: 404 })
    }

    const formData = await request.formData();
    const userId = formData.get('userId')
    const file = formData.get('image');
    const userCookie = verify(cookie.value, process.env.JWT_SECRET)
    if (userCookie.id !== userId) {
      return NextResponse.json({ msg: 'not authorization' }, { status: 401 })
    }
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }
    const arraybuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arraybuffer);


    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString('base64')}`
    );

    const image = await prisma.image.upsert({
      where: {
        userId: userId
      }, include: {
        user: true
      },
      update: {
        url: result.secure_url
      }, create: {
        userId: userId
      }
    })
    const user = await prisma.user.findUnique({
      where: {
        id: image.userId
      },
      include: {
        image: true
      }
    })
    return NextResponse.json({
      message: 'Image uploaded successfully!',
      user,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Failed to upload image', error }, { status: 500 });
  }
}

