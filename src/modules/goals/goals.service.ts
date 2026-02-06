import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { ERRORS } from './messages/errors';
import { plainToInstance } from 'class-transformer';
import { GoalsResponseDto } from './dtos/GoalsResponse.dto';
import { DeleteGoalResponseDto } from './dtos/DeleteGoal.dto';
import {
  CreateGoalRequestDto,
  CreateGoalResponseDto,
} from './dtos/CreateGoal.dto';
import { Goal } from './types/Goal';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
  ) {}

  async getGoalById(userId: number, goalId: string): Promise<GoalsResponseDto> {
    /**
     * This function is used in the GoalExists guard, which checks for every Goal/Streak endpoint if a goal exists.
     *
     * There is no need to duplicate this functionality in other endpoints, or to call this function in other services
     * if they are called from within a controller that users the GoalExists guard, as the found goal will be added to
     * the req
     */

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsRepositoryClient.getGoalById(
      goalIdNumber,
      userId,
    );

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }
    return plainToInstance(GoalsResponseDto, goal); // plainToInstance
  }

  async createGoal(
    newGoalDto: CreateGoalRequestDto,
    userId: number,
  ): Promise<CreateGoalResponseDto> {
    const newGoal: NewGoal = { ...newGoalDto, userId };

    const createdGoal = await this.goalsRepositoryClient.createGoal(newGoal);

    return plainToInstance(CreateGoalResponseDto, createdGoal);
  }

  async getUsersGoals(userId: number): Promise<GoalsResponseDto[]> {
    const goals = await this.goalsRepositoryClient.getUsersGoals(userId);

    return goals.map((goal) => plainToInstance(GoalsResponseDto, goal));
  }

  async deleteGoal(
    goal: Goal,
    ownerId: string,
  ): Promise<DeleteGoalResponseDto> {
    const deleteGoalResult = await this.goalsRepositoryClient.deleteGoal(
      goal.id,
      Number(ownerId),
    );

    return plainToInstance(DeleteGoalResponseDto, deleteGoalResult);
  }

  async updateGoal(
    goal: Goal,
    ownerId: string,
    updatedGoal: UpdateGoalDto,
  ): Promise<GoalsResponseDto> {
    const updatedGoalResponse = await this.goalsRepositoryClient.updateGoal(
      goal.id,
      Number(ownerId),
      updatedGoal,
    );

    return plainToInstance(GoalsResponseDto, updatedGoalResponse);
  }
}
