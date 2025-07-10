-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'COMPLETED', 'VOIDED');

-- AlterTable
ALTER TABLE "Payout" ADD COLUMN     "status" "PayoutStatus";
