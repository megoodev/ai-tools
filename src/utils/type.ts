import { Prisma } from "@prisma/client";
export type Props =  {
  params: { id: string }
}

export type categoryWithRelation = Prisma.categoryGetPayload<{
  include: {
    tools: true
  }
}>


export type usersWithRelation = Prisma.UserGetPayload<{
  include: {
    image: true
  }
}>
export type toolWithRelation = Prisma.ToolGetPayload<{
  include: {
    category: {
      select: {
        name: true
      }
    }
  }
}>