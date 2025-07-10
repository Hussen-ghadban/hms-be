/*
  Warnings:

  - You are about to drop the column `folioItemId` on the `Payout` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "PayoutType" ADD VALUE 'FOLIO_ITEM';

-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "folioItemId",
ADD COLUMN     "ItemId" TEXT;
