import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { UpdateGoalDto } from '../dtos/UpdateGoal.dto';
import { NewGoal } from '../types/NewGoal';

@Injectable()
export class GoalsRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  async createGoal(newGoal: NewGoal, userId: string) {
    const { title, type } = newGoal;
    return this.prismaService.goal.create({
      data: {
        title,
        type,
        user: { connect: { id: userId } },
      },
      include: {
        streaks: true,
      },
    });
  }

  async getUsersGoals(userId: string) {
    return this.prismaService.goal.findMany({
      where: {
        userId: userId,
      },
      include: {
        streaks: true,
      },
    });
  }

  async getGoalById(goalId: string, ownerId: string) {
    return this.prismaService.goal.findUnique({
      where: {
        id: goalId,
        userId: ownerId,
      },
      include: {
        streaks: true,
      },
    });
  }

  async deleteGoal(goalId: string, ownerId: string) {
    return this.prismaService.goal.delete({
      where: {
        id: goalId,
        userId: ownerId,
      },
      include: {
        streaks: true,
      },
    });
  }

  async updateGoal(goalId: string, ownerId: string, updateGoal: UpdateGoalDto) {
    return this.prismaService.goal.update({
      where: {
        id: goalId,
        userId: ownerId,
      },
      include: {
        streaks: true,
      },
      data: updateGoal,
    });
  }
}
