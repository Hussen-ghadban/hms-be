-- CreateTable
CREATE TABLE "_GroupProfileToGuest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupProfileToGuest_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GroupProfileToGuest_B_index" ON "_GroupProfileToGuest"("B");

-- AddForeignKey
ALTER TABLE "_GroupProfileToGuest" ADD CONSTRAINT "_GroupProfileToGuest_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupProfileToGuest" ADD CONSTRAINT "_GroupProfileToGuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
