import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { ERRORS } from './messages/errors';
import { plainToInstance } from 'class-transformer';
import { CreateStreakResponseDto } from './dtos/CreateStreak.dto';
import { Goal } from './types/Goal';

@Injectable()
export class StreaksService {
  constructor(
    @Inject(StreaksRepositoryClient)
    private streaksRepositoryClient: StreaksRepositoryClient,
  ) {}

  async createStreak(goal: Goal) {
    if (goal.streaks.some(({ inProgress }) => inProgress)) {
      throw new BadRequestException(ERRORS.CANNOT_CREATE_NEW_STREAK);
    }

    const createdStreak = this.streaksRepositoryClient.createStreak(goal.id);

    return plainToInstance(CreateStreakResponseDto, createdStreak);
  }

  async updateStreak(streakId: string, goal: Goal) {
    const targetStreak = goal.streaks.find(({ id }) => id === streakId);

    const canTargetStreakBeUpdated =
      !!targetStreak && targetStreak.inProgress && goal.type === 'START';

    if (!canTargetStreakBeUpdated) {
      throw new BadRequestException(ERRORS.CANNOT_UPDATE_STREAK);
    }

    return this.streaksRepositoryClient.updateStreak(streakId, goal.id);
  }

  async expireStreaks(): Promise<void> {
    await this.streaksRepositoryClient.expireStreaks();
  }

  async endStreak(streakId: string, goal: Goal) {
    const targetStreak = goal.streaks.find(({ id }) => id === streakId);

    const canTargetStreakBeEnded = !!targetStreak && targetStreak.inProgress;
    if (!canTargetStreakBeEnded) {
      throw new BadRequestException(ERRORS.CANNOT_END_STREAK);
    }

    return this.streaksRepositoryClient.endStreak(streakId, goal.id);
  }
}
