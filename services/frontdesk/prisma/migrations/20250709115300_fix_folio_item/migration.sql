/*
  Warnings:

  - You are about to drop the column `isVoided` on the `FolioItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FolioItemStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED', 'VOIDED');

-- AlterTable
ALTER TABLE "FolioItem" DROP COLUMN "isVoided",
ADD COLUMN     "status" "FolioItemStatus" NOT NULL DEFAULT 'UNPAID';
