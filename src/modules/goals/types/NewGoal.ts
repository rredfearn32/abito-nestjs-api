import { GoalType } from '@prisma/client';

export interface NewGoal {
  title: string;
  type: GoalType;
}
