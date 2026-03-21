import { Streak } from './Streak';
import { GoalType } from '../../../../generated/prisma';

export interface Goal {
  id: string;
  title: string;
  userId: string;
  type: GoalType;
  streaks: Streak[];
}
