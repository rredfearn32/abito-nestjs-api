import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { ERRORS } from './messages/errors';
import { plainToInstance } from 'class-transformer';
import { GoalResponseDto } from './dtos/GoalResponse.dto';
import { DeleteGoalResponseDto } from './dtos/DeleteGoal.dto';
import {
  CreateGoalRequestDto,
  CreateGoalResponseDto,
} from './dtos/CreateGoal.dto';
import { Goal } from './types/Goal';
import { GetAllGoalsResponseDto } from './dtos/GetAllGoalsResponse.dto';
import { findActiveStreak, findPreviousStreaks } from './domain/goal.helpers';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
  ) {}

  toGoalResponseDto(goal: Goal): GoalResponseDto {
    return plainToInstance(GoalResponseDto, {
      ...goal,
      activeStreak: findActiveStreak(goal.streaks),
      previousStreaks: findPreviousStreaks(goal.streaks),
    });
  }

  async findGoalById(userId: string, goalId: string): Promise<Goal> {
    const goal = await this.goalsRepositoryClient.getGoalById(goalId, userId);
    if (!goal) throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);

    return goal;
  }

  async createGoal(
    newGoalDto: CreateGoalRequestDto,
    userId: string,
  ): Promise<CreateGoalResponseDto> {
    const newGoal: NewGoal = { ...newGoalDto, userId };

    const createdGoal = await this.goalsRepositoryClient.createGoal(newGoal);

    return plainToInstance(CreateGoalResponseDto, createdGoal);
  }

  async getUsersGoals(userId: string): Promise<GetAllGoalsResponseDto[]> {
    const goals = await this.goalsRepositoryClient.getUsersGoals(userId);

    return goals.map((goal) => {
      const activeStreak = findActiveStreak(goal.streaks);

      return plainToInstance(GetAllGoalsResponseDto, {
        ...goal,
        activeStreak,
      });
    });
  }

  async deleteGoal(
    goal: Goal,
    ownerId: string,
  ): Promise<DeleteGoalResponseDto> {
    const deleteGoalResult = await this.goalsRepositoryClient.deleteGoal(
      goal.id,
      ownerId,
    );

    return plainToInstance(DeleteGoalResponseDto, deleteGoalResult);
  }

  async updateGoal(
    goal: Goal,
    ownerId: string,
    updateGoal: UpdateGoalDto,
  ): Promise<GoalResponseDto> {
    await this.goalsRepositoryClient.updateGoal(goal.id, ownerId, updateGoal);

    const updatedGoal = await this.findGoalById(ownerId, goal.id);

    return this.toGoalResponseDto(updatedGoal);
  }
}
