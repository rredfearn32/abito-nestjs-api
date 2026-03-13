import { Streak } from './Streak';
import { GoalType } from '../../../../generated/prisma';

export interface Goal {
  id: number;
  title: string;
  userId: number;
  type: GoalType;
  streaks: Streak[];
}
