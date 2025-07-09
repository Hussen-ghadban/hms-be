-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('REFUND', 'EXPENSE', 'MAINTENANCE', 'SUPPLY_PURCHASE', 'SALARY', 'OTHER');

-- CreateEnum
CREATE TYPE "PayoutType" AS ENUM ('GUEST_PAYMENT', 'CITY_LEDGER', 'SUBSIDY', 'CREDIT', 'OTHER');

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "type" "PaymentType" NOT NULL,
    "recipient" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guestId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "type" "PayoutType" NOT NULL,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guestId" TEXT,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);
