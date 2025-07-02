-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('CORPORATE', 'TRAVEL_AGENCY', 'EVENT_PLANNER', 'GOVERNMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "GroupProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legalName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "primaryContact" JSONB,
    "address" JSONB,
    "billingAddress" JSONB,
    "businessType" "BusinessType" NOT NULL,
    "specialRequirements" TEXT,
    "status" "GroupStatus" NOT NULL DEFAULT 'ACTIVE',
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupProfile_pkey" PRIMARY KEY ("id")
);
