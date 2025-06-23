/*
  Warnings:

  - You are about to drop the column `userId` on the `Tool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_userId_fkey";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_ToolToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ToolToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ToolToUser_B_index" ON "_ToolToUser"("B");

-- AddForeignKey
ALTER TABLE "_ToolToUser" ADD CONSTRAINT "_ToolToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ToolToUser" ADD CONSTRAINT "_ToolToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
