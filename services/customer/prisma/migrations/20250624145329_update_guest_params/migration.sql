/*
  Warnings:

  - A unique constraint covering the columns `[gid]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gid` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "gid" TEXT NOT NULL,
ADD COLUMN     "identification" JSONB NOT NULL,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "preferences" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_gid_key" ON "Guest"("gid");
