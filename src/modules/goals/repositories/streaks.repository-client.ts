import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class StreaksRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  async createStreak(goalId: number) {
    return this.prismaService.streak.create({
      data: {
        goal: { connect: { id: goalId } },
      },
    });
  }

  async updateStreak(streakId: number, goalId: number) {
    return this.prismaService.streak.update({
      where: {
        id: streakId,
        goalId,
      },
      data: {
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async endStreak(streakId: number, goalId: number) {
    return this.prismaService.streak.update({
      where: {
        id: streakId,
        goalId,
      },
      data: {
        inProgress: false,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
