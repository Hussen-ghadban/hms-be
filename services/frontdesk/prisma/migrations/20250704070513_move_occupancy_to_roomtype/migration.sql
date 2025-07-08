/*
  Warnings:

  - You are about to drop the column `adultOccupancy` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `childOccupancy` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `maxOccupancy` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "adultOccupancy",
DROP COLUMN "childOccupancy",
DROP COLUMN "maxOccupancy";

-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "adultOccupancy" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "childOccupancy" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "maxOccupancy" INTEGER NOT NULL DEFAULT 1;
