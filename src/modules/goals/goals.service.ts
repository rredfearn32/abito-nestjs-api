import { Inject, Injectable } from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoalDto';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
  ) {}

  async createGoal(newGoal: NewGoal) {
    return this.goalsRepositoryClient.createGoal(newGoal);
  }

  async getUsersGoals(userId: number) {
    return this.goalsRepositoryClient.getUsersGoals(userId);
  }

  async getGoalById(goalId: number, ownerId: number) {
    return this.goalsRepositoryClient.getGoalById(goalId, ownerId);
  }

  async deleteGoal(goalId: number, ownerId: number) {
    return this.goalsRepositoryClient.deleteGoal(goalId, ownerId);
  }

  async updateGoal(
    goalId: number,
    ownerId: number,
    updatedGoal: UpdateGoalDto,
  ) {
    return this.goalsRepositoryClient.updateGoal(goalId, ownerId, updatedGoal);
  }
}
