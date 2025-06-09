import { StreakType } from '../../../../generated/prisma';

export interface Streak {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: StreakType;
  inProgress: boolean;
  goalId: number;
}
