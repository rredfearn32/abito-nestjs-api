import { GoalType, Streak } from '@prisma/client';

export interface Goal {
  id: string;
  title: string;
  userId: string;
  type: GoalType;
  streaks: Streak[];
}
