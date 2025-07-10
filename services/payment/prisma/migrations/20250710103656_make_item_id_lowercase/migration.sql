/*
  Warnings:

  - You are about to drop the column `ItemId` on the `Payout` table. All the data in the column will be lost.
  - Made the column `status` on table `Payout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "ItemId",
ADD COLUMN     "itemId" TEXT,
ALTER COLUMN "status" SET NOT NULL;
