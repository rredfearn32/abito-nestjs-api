import { GoalType, Streak } from '@prisma/client';

export interface GoalView {
  id: string;
  title: string;
  type: GoalType;
  activeStreak: Streak | null;
  previousStreaks?: Streak[];
}
