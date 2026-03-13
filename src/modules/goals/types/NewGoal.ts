import { GoalType } from '../../../../generated/prisma';

export interface NewGoal {
  title: string;
  userId: number;
  type: GoalType;
}
