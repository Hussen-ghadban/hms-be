/*
  Warnings:

  - A unique constraint covering the columns `[hotelId]` on the table `Area` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hotelId` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "hotelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Area_hotelId_key" ON "Area"("hotelId");
