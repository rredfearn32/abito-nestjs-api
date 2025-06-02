-- CreateEnum
CREATE TYPE "StreakType" AS ENUM ('START', 'STOP');

-- CreateTable
CREATE TABLE "Streak" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "StreakType" NOT NULL,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
