import { UsersService } from '../../infrastructure/users/users.service';
import { GoalsService } from './goals.service';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponse.dto';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { CreateGoalRequestDto } from './dtos/CreateGoal.dto';
import { StreaksService } from './streaks.service';
export declare class GoalsController {
    private readonly userService;
    private readonly goalsService;
    private readonly streaksService;
    constructor(userService: UsersService, goalsService: GoalsService, streaksService: StreaksService);
    getAllGoalsForUser(req: any): Promise<GetAllGoalsForUserResponseDto[]>;
    getGoalById(goalId: string, req: any): Promise<GetSingleGoalResponseDto | undefined>;
    createGoal(newGoalDto: CreateGoalRequestDto, req: any): Promise<import("./dtos/CreateGoal.dto").CreateGoalResponseDto>;
    deleteGoal(goalId: string, req: any): Promise<import("./dtos/DeleteGoal.dto").DeleteGoalResponseDto>;
    updateGoal(updatedGoal: UpdateGoalDto, goalId: string, req: any): Promise<GetSingleGoalResponseDto>;
    createStreak(goalId: string, req: any, newStreak: NewStreakDto): Promise<import("./dtos/CreateStreak.dto").CreateStreakResponseDto>;
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
