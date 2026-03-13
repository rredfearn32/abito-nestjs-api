/*
  Warnings:

  - You are about to drop the column `type` on the `Streak` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Streak" DROP COLUMN "type";

-- DropEnum
DROP TYPE "StreakType";
