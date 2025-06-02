import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewStreakDto } from '../dtos/NewStreakDto';

@Injectable()
export class StreaksRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  async createStreak(goalId: number, newStreak: NewStreakDto) {
    const { type } = newStreak;
    return this.prismaService.streak.create({
      data: {
        type,
        goal: { connect: { id: goalId } },
      },
    });
  }

  async endStreak(goalId: number) {
    return this.prismaService.streak.updateMany({
      where: {
        goalId: goalId,
        inProgress: true,
      },
      data: {
        inProgress: false,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
