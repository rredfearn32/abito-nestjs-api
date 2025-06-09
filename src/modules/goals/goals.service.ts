import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { NewStreakDto } from './dtos/NewStreak.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { ERRORS } from './messages/error';
import { plainToInstance } from 'class-transformer';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
    @Inject(StreaksRepositoryClient)
    private streaksRepositoryClient: StreaksRepositoryClient,
    private readonly userService: UsersService,
  ) {}

  async createGoal(newGoal: NewGoal) {
    return this.goalsRepositoryClient.createGoal(newGoal);
  }

  async getUsersGoals(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goals = await this.goalsRepositoryClient.getUsersGoals(userId);

    return goals.map((goal) =>
      plainToInstance(GetAllGoalsForUserResponseDto, goal),
    );
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

  async createStreak(goalId: number, newStreak: NewStreakDto) {
    return this.streaksRepositoryClient.createStreak(goalId, newStreak);
  }

  async updateStreak(streakId: number, goalId: number) {
    return this.streaksRepositoryClient.updateStreak(streakId, goalId);
  }

  async endStreak(streakId: number, goalId: number) {
    return this.streaksRepositoryClient.endStreak(streakId, goalId);
  }
}
