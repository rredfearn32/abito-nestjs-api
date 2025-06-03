import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewStreakDto } from '../dtos/NewStreak.dto';
export declare class StreaksRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    createStreak(goalId: number, newStreak: NewStreakDto): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    updateStreak(streakId: number, goalId: number): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    endStreak(streakId: number, goalId: number): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
}
