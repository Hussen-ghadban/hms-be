/*
  Warnings:

  - You are about to drop the column `outletId` on the `Maintenance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Maintenance" DROP COLUMN "outletId",
ADD COLUMN     "areaId" TEXT;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
