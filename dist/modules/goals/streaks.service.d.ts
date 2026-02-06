import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { CreateStreakResponseDto } from './dtos/CreateStreak.dto';
import { Goal } from './types/Goal';
export declare class StreaksService {
    private streaksRepositoryClient;
    constructor(streaksRepositoryClient: StreaksRepositoryClient);
    createStreak(goal: Goal, newStreak: NewStreakDto): Promise<CreateStreakResponseDto>;
    updateStreak(streakId: string, goal: Goal): Promise<{
        id: number;
        createdAt: Date;
        type: import("generated/prisma").$Enums.StreakType;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    endStreak(streakId: string, goal: Goal): Promise<{
        id: number;
        createdAt: Date;
        type: import("generated/prisma").$Enums.StreakType;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
}
