-- CreateEnum
CREATE TYPE "RoomCleaningStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "HouseKeepingTask" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "RoomCleaningStatus" NOT NULL,

    CONSTRAINT "HouseKeepingTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HouseKeepingTask" ADD CONSTRAINT "HouseKeepingTask_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
