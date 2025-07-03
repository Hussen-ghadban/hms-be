/*
  Warnings:

  - The `status` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "maintenanceStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Maintenance" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "maintenanceStatus" NOT NULL DEFAULT 'PENDING';
