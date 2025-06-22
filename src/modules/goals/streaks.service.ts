import {
  BadRequestException,
  Inject,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { UsersService } from '../../infrastructure/users/users.service';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { ERRORS } from './messages/error';
import { GoalsService } from './goals.service';
import { plainToInstance } from 'class-transformer';
import { CreateStreakResponseDto } from './dtos/CreateStreak.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { UserExistsGuard } from '../../guards/userexists.guard';
import { Goal } from './types/Goal';

@UseGuards(AuthGuard, UserExistsGuard)
@Injectable()
export class StreaksService {
  constructor(
    @Inject(StreaksRepositoryClient)
    private streaksRepositoryClient: StreaksRepositoryClient,
    private readonly userService: UsersService,
    private readonly goalsService: GoalsService,
  ) {}

  async createStreak(goal: Goal, newStreak: NewStreakDto) {
    if (goal.streaks.filter(({ inProgress }) => inProgress).length) {
      throw new BadRequestException(ERRORS.CANNOT_CREATE_NEW_STREAK);
    }

    const createdStreak = this.streaksRepositoryClient.createStreak(
      goal.id,
      newStreak,
    );

    return plainToInstance(CreateStreakResponseDto, createdStreak);
  }

  async updateStreak(streakId: string, goal: Goal) {
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

    return this.streaksRepositoryClient.updateStreak(streakIdNumber, goal.id);
  }

  async endStreak(streakId: string, goal: Goal) {
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

    return this.streaksRepositoryClient.endStreak(streakIdNumber, goal.id);
  }
}
