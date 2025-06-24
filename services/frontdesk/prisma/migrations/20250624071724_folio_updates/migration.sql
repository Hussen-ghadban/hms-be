/*
  Warnings:

  - You are about to drop the `_AmenityToRoomType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adultOccupancy` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `childOccupancy` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxOccupancy` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FolioType" AS ENUM ('ROOM_CHARGE', 'FOOD_BEVERAGE', 'TELEPHONE', 'LAUNDRY', 'SPA', 'MINIBAR', 'PARKING', 'WIFI', 'TAX', 'CITY_TAX', 'SERVICE_CHARGE', 'INCIDENTAL', 'PAYMENT_CASH', 'PAYMENT_CARD', 'PAYMENT_TRANSFER', 'ADJUSTMENT_CREDIT', 'ADJUSTMENT_DEBIT', 'COMP', 'VOID');

-- CreateEnum
CREATE TYPE "FolioStatus" AS ENUM ('OPEN', 'CLOSED', 'VOIDED', 'TRANSFERRED');

-- DropForeignKey
ALTER TABLE "_AmenityToRoomType" DROP CONSTRAINT "_AmenityToRoomType_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToRoomType" DROP CONSTRAINT "_AmenityToRoomType_B_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "adultOccupancy" INTEGER NOT NULL,
ADD COLUMN     "childOccupancy" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "maxOccupancy" INTEGER NOT NULL,
ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "_AmenityToRoomType";

-- CreateTable
CREATE TABLE "Folio" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "status" "FolioStatus" NOT NULL DEFAULT 'OPEN',
    "balance" DECIMAL(10,4) NOT NULL DEFAULT 0,

    CONSTRAINT "Folio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FolioItem" (
    "id" TEXT NOT NULL,
    "folioId" TEXT NOT NULL,
    "itemType" "FolioType" NOT NULL,
    "amount" DECIMAL(10,4) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,4),
    "isVoided" BOOLEAN NOT NULL DEFAULT false,
    "voidReason" TEXT,
    "voidedAt" TIMESTAMP(3),
    "voidedBy" TEXT,

    CONSTRAINT "FolioItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomConnections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomConnections_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RoomAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomAmenities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RoomConnections_B_index" ON "_RoomConnections"("B");

-- CreateIndex
CREATE INDEX "_RoomAmenities_B_index" ON "_RoomAmenities"("B");

-- AddForeignKey
ALTER TABLE "FolioItem" ADD CONSTRAINT "FolioItem_folioId_fkey" FOREIGN KEY ("folioId") REFERENCES "Folio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomConnections" ADD CONSTRAINT "_RoomConnections_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomConnections" ADD CONSTRAINT "_RoomConnections_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomAmenities" ADD CONSTRAINT "_RoomAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomAmenities" ADD CONSTRAINT "_RoomAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
