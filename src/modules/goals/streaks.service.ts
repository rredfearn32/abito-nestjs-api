import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { UsersService } from '../../infrastructure/users/users.service';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { ERRORS } from './messages/error';
import { GoalsService } from './goals.service';
import { plainToInstance } from 'class-transformer';
import { CreateStreakResponseDto } from './dtos/CreateStreak.dto';

@Injectable()
export class StreaksService {
  constructor(
    @Inject(StreaksRepositoryClient)
    private streaksRepositoryClient: StreaksRepositoryClient,
    private readonly userService: UsersService,
    private readonly goalsService: GoalsService,
  ) {}

  async createStreak(goalId: string, userId: string, newStreak: NewStreakDto) {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const user = await this.userService.findUserById(userIdNumber);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(userIdNumber, goalId);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    if (goal.streaks.filter(({ inProgress }) => inProgress).length) {
      throw new BadRequestException(ERRORS.CANNOT_CREATE_NEW_STREAK);
    }

    const createdStreak = this.streaksRepositoryClient.createStreak(
      goalIdNumber,
      newStreak,
    );

    return plainToInstance(CreateStreakResponseDto, createdStreak);
  }

  async updateStreak(streakId: string, userId: string, goalId: string) {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const user = await this.userService.findUserById(userIdNumber);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(Number(userId), goalId);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const streakIdNumber = Number(streakId);

    if (isNaN(streakIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const targetStreak = goal.streaks.find(({ id }) => id === streakIdNumber);

    const canTargetStreakBeUpdated =
      !!targetStreak &&
      targetStreak.inProgress &&
      targetStreak.type === 'START';

    if (!canTargetStreakBeUpdated) {
      throw new BadRequestException(ERRORS.CANNOT_UPDATE_STREAK);
    }

    return this.streaksRepositoryClient.updateStreak(
      streakIdNumber,
      goalIdNumber,
    );
  }

  async endStreak(streakId: string, userId: string, goalId: string) {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const user = await this.userService.findUserById(userIdNumber);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(Number(userId), goalId);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const streakIdNumber = Number(streakId);

    if (isNaN(streakIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const targetStreak = goal.streaks.find(({ id }) => id === streakIdNumber);

    const canTargetStreakBeEnded =
      !!targetStreak &&
      targetStreak.inProgress &&
      targetStreak.type === 'START';

    if (!canTargetStreakBeEnded) {
      throw new BadRequestException(ERRORS.CANNOT_END_STREAK);
    }

    return this.streaksRepositoryClient.endStreak(streakIdNumber, goalIdNumber);
  }
}
