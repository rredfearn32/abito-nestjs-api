import { Inject, Injectable } from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
  ) {}

  async createGoal(newGoal: NewGoal) {
    return this.goalsRepositoryClient.createGoal(newGoal);
  }
}
