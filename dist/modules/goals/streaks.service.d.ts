import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { UsersService } from '../../infrastructure/users/users.service';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { GoalsService } from './goals.service';
import { CreateStreakResponseDto } from './dtos/CreateStreak.dto';
import { Goal } from './types/Goal';
export declare class StreaksService {
    private streaksRepositoryClient;
    private readonly userService;
    private readonly goalsService;
    constructor(streaksRepositoryClient: StreaksRepositoryClient, userService: UsersService, goalsService: GoalsService);
    createStreak(goal: Goal, newStreak: NewStreakDto): Promise<CreateStreakResponseDto>;
    updateStreak(streakId: string, goal: Goal): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    endStreak(streakId: string, goal: Goal): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
}
