/*
  Warnings:

  - A unique constraint covering the columns `[groupBookingId]` on the table `Folio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Folio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FolioCreationType" AS ENUM ('INDIVIDUAL', 'MASTER');

-- CreateEnum
CREATE TYPE "GroupBookingStatus" AS ENUM ('DRAFT', 'CONFIRMED', 'PARTIALLY_CHECKED_IN', 'CHECKED_IN', 'PARTIALLY_CHECKED_OUT', 'CHECKED_OUT', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ChargeRouting" AS ENUM ('OWN_FOLIO', 'MASTER_FOLIO', 'SPLIT');

-- DropForeignKey
ALTER TABLE "Folio" DROP CONSTRAINT "Folio_reservationId_fkey";

-- AlterTable
ALTER TABLE "Folio" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "folioType" "FolioCreationType" NOT NULL DEFAULT 'INDIVIDUAL',
ADD COLUMN     "groupBookingId" TEXT,
ADD COLUMN     "parentFolioId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "reservationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "chargeRouting" "ChargeRouting" NOT NULL DEFAULT 'OWN_FOLIO',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groupBookingId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "GroupBooking" (
    "id" TEXT NOT NULL,
    "groupProfileId" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "status" "GroupBookingStatus" NOT NULL DEFAULT 'DRAFT',
    "specialRequests" TEXT,
    "notes" TEXT,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folio_groupBookingId_key" ON "Folio"("groupBookingId");

-- AddForeignKey
ALTER TABLE "Folio" ADD CONSTRAINT "Folio_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folio" ADD CONSTRAINT "Folio_groupBookingId_fkey" FOREIGN KEY ("groupBookingId") REFERENCES "GroupBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folio" ADD CONSTRAINT "Folio_parentFolioId_fkey" FOREIGN KEY ("parentFolioId") REFERENCES "Folio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_groupBookingId_fkey" FOREIGN KEY ("groupBookingId") REFERENCES "GroupBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
