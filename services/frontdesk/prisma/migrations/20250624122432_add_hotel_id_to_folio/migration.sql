/*
  Warnings:

  - Added the required column `hotelId` to the `Folio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folio" ADD COLUMN     "hotelId" TEXT NOT NULL;
