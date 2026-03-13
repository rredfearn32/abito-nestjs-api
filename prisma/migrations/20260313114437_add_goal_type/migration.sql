/*
  Warnings:

  - Added the required column `type` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('START', 'STOP');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "type" "GoalType" NOT NULL;
