import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewStreakDto } from '../dtos/CreateStreak.dto';
export declare class StreaksRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    createStreak(goalId: number, newStreak: NewStreakDto): Promise<{
        id: number;
        createdAt: Date;
        type: import("generated/prisma").$Enums.StreakType;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    updateStreak(streakId: number, goalId: number): Promise<{
        id: number;
        createdAt: Date;
        type: import("generated/prisma").$Enums.StreakType;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    endStreak(streakId: number, goalId: number): Promise<{
        id: number;
        createdAt: Date;
        type: import("generated/prisma").$Enums.StreakType;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
}
