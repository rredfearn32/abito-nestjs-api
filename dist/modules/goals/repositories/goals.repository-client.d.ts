import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewGoal } from '../types/NewGoal';
import { UpdateGoalDto } from '../dtos/UpdateGoal.dto';
export declare class GoalsRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    createGoal(newGoal: NewGoal): Promise<{
        id: number;
        userId: number;
        title: string;
    }>;
    getUsersGoals(userId: number): Promise<({
        streaks: {
            id: number;
            createdAt: Date;
            type: import("generated/prisma").$Enums.StreakType;
            updatedAt: Date | null;
            inProgress: boolean;
            goalId: number;
        }[];
    } & {
        id: number;
        userId: number;
        title: string;
    })[]>;
    getGoalById(goalId: number, ownerId: number): Promise<{
        streaks: {
            id: number;
            createdAt: Date;
            type: import("generated/prisma").$Enums.StreakType;
            updatedAt: Date | null;
            inProgress: boolean;
            goalId: number;
        }[];
    } & {
        id: number;
        userId: number;
        title: string;
    }>;
    deleteGoal(goalId: number, ownerId: number): Promise<{
        streaks: {
            id: number;
            createdAt: Date;
            type: import("generated/prisma").$Enums.StreakType;
            updatedAt: Date | null;
            inProgress: boolean;
            goalId: number;
        }[];
    } & {
        id: number;
        userId: number;
        title: string;
    }>;
    updateGoal(goalId: number, ownerId: number, updateGoal: UpdateGoalDto): Promise<{
        id: number;
        userId: number;
        title: string;
    }>;
}
