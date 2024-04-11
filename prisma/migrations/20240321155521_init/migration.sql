/*
  Warnings:

  - You are about to drop the `Fait_partie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fait_partie" DROP CONSTRAINT "Fait_partie_ParticipantId_fkey";

-- DropForeignKey
ALTER TABLE "Fait_partie" DROP CONSTRAINT "Fait_partie_ShipmentId_fkey";

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "ShipmentId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Fait_partie";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_ShipmentId_fkey" FOREIGN KEY ("ShipmentId") REFERENCES "Shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
