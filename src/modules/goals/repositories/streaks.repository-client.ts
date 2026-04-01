import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class StreaksRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  async createStreak(goalId: string) {
    return this.prismaService.streak.create({
      data: {
        goal: { connect: { id: goalId } },
      },
    });
  }

  async updateStreak(streakId: string, goalId: string) {
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

  async endStreak(streakId: string, goalId: string) {
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

  async expireStreaks() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return this.prismaService.streak.updateManyAndReturn({
      where: {
        inProgress: true,
        OR: [
          {
            updatedAt: {
              lte: cutoff,
            },
          },
          {
            createdAt: { lte: cutoff },
            updatedAt: null,
          },
        ],
        goal: {
          type: 'START',
        },
      },
      data: {
        updatedAt: new Date().toISOString(),
        inProgress: false,
      },
    });
  }
}
