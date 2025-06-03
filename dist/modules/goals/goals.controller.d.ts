import { UsersService } from '../../infrastructure/users/users.service';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dtos/CreateGoal.dto';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponse.dto';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { NewStreakDto } from './dtos/NewStreak.dto';
export declare class GoalsController {
    private readonly userService;
    private readonly goalsService;
    constructor(userService: UsersService, goalsService: GoalsService);
    getAllGoalsForUser(req: any): Promise<GetAllGoalsForUserResponseDto[]>;
    getGoalById(goalId: string, req: any): Promise<GetSingleGoalResponseDto | undefined>;
    createGoal(newGoalDto: CreateGoalDto, req: any): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
    deleteGoal(goalId: string, req: any): Promise<{
        streaks: {
            id: number;
            type: import("generated/prisma").$Enums.StreakType;
            createdAt: Date;
            updatedAt: Date | null;
            inProgress: boolean;
            goalId: number;
        }[];
        id: number;
        title: string;
    }>;
    updateGoal(updatedGoal: UpdateGoalDto, goalId: string, req: any): Promise<{
        id: number;
        title: string;
    }>;
    createStreak(goalId: string, req: any, newStreak: NewStreakDto): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    updateStreak(goalId: string, streakId: string, req: any): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
    endStreak(goalId: string, streakId: string, req: any): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        inProgress: boolean;
        goalId: number;
    }>;
}
