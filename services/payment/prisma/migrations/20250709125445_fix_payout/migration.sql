/*
  Warnings:

  - You are about to drop the column `currency` on the `Payout` table. All the data in the column will be lost.
  - Added the required column `currencyId` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "currency",
ADD COLUMN     "currencyId" TEXT NOT NULL,
ADD COLUMN     "folioItemIds" TEXT[];
