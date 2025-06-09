import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { NewStreakDto } from './dtos/NewStreak.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
export declare class GoalsService {
    private goalsRepositoryClient;
    private streaksRepositoryClient;
    private readonly userService;
    constructor(goalsRepositoryClient: GoalsRepositoryClient, streaksRepositoryClient: StreaksRepositoryClient, userService: UsersService);
    createGoal(newGoal: NewGoal): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
    getUsersGoals(userId: number): Promise<GetAllGoalsForUserResponseDto[]>;
    getGoalById(goalId: number, ownerId: number): Promise<{
        streaks: {
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
        streaks: {
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
    updateGoal(goalId: number, ownerId: number, updatedGoal: UpdateGoalDto): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
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
