-- DropForeignKey
ALTER TABLE "RatePlan" DROP CONSTRAINT "RatePlan_currencyId_fkey";

-- AddForeignKey
ALTER TABLE "RatePlan" ADD CONSTRAINT "RatePlan_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
