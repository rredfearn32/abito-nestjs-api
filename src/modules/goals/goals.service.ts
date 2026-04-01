import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { GOAL_ERRORS } from '../../messages/goals.errors';
import { Goal } from './types/Goal';
import { findActiveStreak, findPreviousStreaks } from './domain/goal.helpers';
import { NewGoal } from './types/NewGoal';
import { GoalView } from './types/GoalView';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
  ) {}

  toGoalView(goal: Goal, includePreviousStreaks: boolean = true): GoalView {
    const goalView: GoalView = {
      id: goal.id,
      title: goal.title,
      type: goal.type,
      activeStreak: findActiveStreak(goal.streaks),
    };
    if (includePreviousStreaks) {
      goalView.previousStreaks = findPreviousStreaks(goal.streaks);
    }
    return goalView;
  }

  // This method needs to return a raw Goal, as it is used by the GoalExistsGuard
  async findSingleGoalById(userId: string, goalId: string): Promise<Goal> {
    const goal = await this.goalsRepositoryClient.getGoalById(goalId, userId);
    if (!goal) throw new NotFoundException(GOAL_ERRORS.GOAL_NOT_FOUND);

    return goal;
  }

  async createGoal(newGoal: NewGoal, userId: string) {
    return this.goalsRepositoryClient.createGoal(newGoal, userId);
  }

  async getAllGoalsForUser(userId: string) {
    return this.goalsRepositoryClient.getUsersGoals(userId);
  }

  async deleteGoal(goal: Goal, userId: string) {
    return await this.goalsRepositoryClient.deleteGoal(goal.id, userId);
  }

  async updateGoal(
    goal: Goal,
    ownerId: string,
    updateGoal: UpdateGoalDto,
  ): Promise<Goal> {
    return this.goalsRepositoryClient.updateGoal(goal.id, ownerId, updateGoal);
  }
}
