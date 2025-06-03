import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewGoal } from '../types/NewGoal';
import { UpdateGoalDto } from '../dtos/UpdateGoalDto';

@Injectable()
export class GoalsRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  async createGoal(newGoal: NewGoal) {
    const { title, userId } = newGoal;
    return this.prismaService.goal.create({
      data: {
        title,
        user: { connect: { id: userId } },
      },
    });
  }

  async getUsersGoals(userId: number) {
    return this.prismaService.goal.findMany({
      where: {
        userId: userId,
      },
      include: {
        streaks: true,
      },
    });
  }

  async getGoalById(goalId: number, ownerId: number) {
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

  async deleteGoal(goalId: number, ownerId: number) {
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

  async updateGoal(goalId: number, ownerId: number, updateGoal: UpdateGoalDto) {
    return this.prismaService.goal.update({
      where: {
        id: goalId,
        userId: ownerId,
      },
      data: updateGoal,
    });
  }
}
