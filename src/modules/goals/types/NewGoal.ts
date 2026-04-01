import { GoalType } from '../../../../generated/prisma';

export interface NewGoal {
  title: string;
  type: GoalType;
}
