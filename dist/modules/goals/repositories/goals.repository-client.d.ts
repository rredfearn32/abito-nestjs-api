import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewGoal } from '../types/NewGoal';
import { UpdateGoalDto } from '../dtos/UpdateGoalDto';
export declare class GoalsRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
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
            updatedAt: Date | null;
            inProgress: boolean;
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
            updatedAt: Date | null;
            inProgress: boolean;
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
            updatedAt: Date | null;
            inProgress: boolean;
            goalId: number;
        }[];
    } & {
        id: number;
        title: string;
        userId: number;
    }>;
    updateGoal(goalId: number, ownerId: number, updateGoal: UpdateGoalDto): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
}
