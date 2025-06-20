import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { ERRORS } from './messages/error';
import { plainToInstance } from 'class-transformer';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponse.dto';
import { DeleteGoalResponseDto } from './dtos/DeleteGoal.dto';
import {
  CreateGoalRequestDto,
  CreateGoalResponseDto,
} from './dtos/CreateGoal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GoalsRepositoryClient)
    private goalsRepositoryClient: GoalsRepositoryClient,
    private readonly userService: UsersService,
  ) {}

  async createGoal(newGoalDto: CreateGoalRequestDto, userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const newGoal: NewGoal = { ...newGoalDto, userId };

    const createdGoal = this.goalsRepositoryClient.createGoal(newGoal);

    return plainToInstance(CreateGoalResponseDto, createdGoal);
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

  async getGoalById(userId: number, goalId: string) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

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
    return plainToInstance(GetSingleGoalResponseDto, goal); // plainToInstance
  }

  async deleteGoal(goalId: string, ownerId: string) {
    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.getGoalById(goalIdNumber, ownerId);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const deleteGoalResult = this.goalsRepositoryClient.deleteGoal(
      goalIdNumber,
      Number(ownerId),
    );

    return plainToInstance(DeleteGoalResponseDto, deleteGoalResult);
  }

  async updateGoal(
    goalId: string,
    ownerId: string,
    updatedGoal: UpdateGoalDto,
  ) {
    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.getGoalById(Number(ownerId), goalId);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const updatedGoalResponse = this.goalsRepositoryClient.updateGoal(
      goalIdNumber,
      Number(ownerId),
      updatedGoal,
    );

    return plainToInstance(GetSingleGoalResponseDto, updatedGoalResponse);
  }
}
