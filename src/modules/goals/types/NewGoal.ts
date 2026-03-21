import { GoalType } from '../../../../generated/prisma';

export interface NewGoal {
  title: string;
  userId: string;
  type: GoalType;
}
