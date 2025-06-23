import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { verify } from "jsonwebtoken";
import { prisma } from "@/utils/db";

// 1. Strict JWT Payload interface
interface JwtPayload {
  isAdmin: boolean;
  [key: string]: unknown; // For additional properties while avoiding 'any'
}

// 2. Proper RouteContext type that matches Next.js expectations
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Authentication check
    const cookie = request.cookies.get('jwtToken');
    if (!cookie?.value) {
      return NextResponse.json(
        { message: 'Authentication token missing' },
        { status: 401 }
      );
    }

    // Token verification with proper typing
    const decoded = verify(cookie.value, process.env.JWT_SECRET!);

    // Type guard for JWT payload
    if (typeof decoded !== 'object' || decoded === null || !('isAdmin' in decoded)) {
      return NextResponse.json(
        { message: 'Invalid token structure' },
        { status: 401 }
      );
    }

    const userCookie = decoded as JwtPayload;
    if (!userCookie.isAdmin) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 403 }
      );
    }

    // Request body validation
    const { name } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { message: 'Name must be a non-empty string' },
        { status: 400 }
      );
    }

    // Database operations
    const categoryExists = await prisma.category.findUnique({
      where: { id: context.params.id }
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: context.params.id },
      data: { name },
    });

    return NextResponse.json(
      {
        message: 'Category updated successfully',
        data: updatedCategory
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in category update:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}