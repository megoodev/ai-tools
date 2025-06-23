/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_favoriteId_fkey";

-- DropIndex
DROP INDEX "Tool_favoriteId_key";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "favoriteId",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Favorite";

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
