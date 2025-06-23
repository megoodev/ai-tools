import { prisma } from "@/utils/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") NextResponse.json({ error: 'this method is not allowed' })
  const { email, username, password } = (await request?.json())
  if (!email && !username && !password) {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 })
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }  // Fixed: where clause needs an object
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }, select: {
        id: true,
        username: true,
        email: true,

      }
    })
    await prisma.image.create({
      data: {
        userId: newUser.id
      }
    })
    return NextResponse.json({ newUser })
  } catch (error) {
    return NextResponse.json({ error })
  }
}