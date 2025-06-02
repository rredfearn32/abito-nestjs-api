import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoalDto';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { NewStreakDto } from './dtos/NewStreakDto';
export declare class GoalsService {
    private goalsRepositoryClient;
    private streaksRepositoryClient;
    constructor(goalsRepositoryClient: GoalsRepositoryClient, streaksRepositoryClient: StreaksRepositoryClient);
    createGoal(newGoal: NewGoal): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
    getUsersGoals(userId: number): Promise<({
        Streak: {
            id: number;
            type: import("generated/prisma").$Enums.StreakType;
            createdAt: Date;
            updatedAt: Date;
            goalId: number;
        }[];
    } & {
        id: number;
        title: string;
        userId: number;
    })[]>;
    getGoalById(goalId: number, ownerId: number): Promise<{
        Streak: {
            id: number;
            type: import("generated/prisma").$Enums.StreakType;
            createdAt: Date;
            updatedAt: Date;
            goalId: number;
        }[];
    } & {
        id: number;
        title: string;
        userId: number;
    }>;
    deleteGoal(goalId: number, ownerId: number): Promise<{
        Streak: {
            id: number;
            type: import("generated/prisma").$Enums.StreakType;
            createdAt: Date;
            updatedAt: Date;
            goalId: number;
        }[];
    } & {
        id: number;
        title: string;
        userId: number;
    }>;
    updateGoal(goalId: number, ownerId: number, updatedGoal: UpdateGoalDto): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
    createStreak(goalId: number, newStreak: NewStreakDto): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date;
        goalId: number;
    }>;
}
