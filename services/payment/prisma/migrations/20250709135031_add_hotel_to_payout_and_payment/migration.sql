/*
  Warnings:

  - Added the required column `hotelId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "hotelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payout" ADD COLUMN     "hotelId" TEXT NOT NULL;
