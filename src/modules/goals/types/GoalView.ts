import { GoalType, Streak } from '../../../../generated/prisma';

export interface GoalView {
  id: string;
  title: string;
  type: GoalType;
  activeStreak: Streak | null;
  previousStreaks?: Streak[];
}
