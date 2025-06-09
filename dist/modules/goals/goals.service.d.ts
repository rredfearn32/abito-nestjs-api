import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponse.dto';
import { DeleteGoalResponseDto } from './dtos/DeleteGoal.dto';
import { CreateGoalRequestDto, CreateGoalResponseDto } from './dtos/CreateGoal.dto';
import { Goal } from './types/Goal';
export declare class GoalsService {
    private goalsRepositoryClient;
    private readonly userService;
    constructor(goalsRepositoryClient: GoalsRepositoryClient, userService: UsersService);
    getGoalById(userId: number, goalId: string): Promise<GetSingleGoalResponseDto>;
    createGoal(newGoalDto: CreateGoalRequestDto, userId: number): Promise<CreateGoalResponseDto>;
    getUsersGoals(userId: number): Promise<GetAllGoalsForUserResponseDto[]>;
    deleteGoal(goal: Goal, ownerId: string): Promise<DeleteGoalResponseDto>;
    updateGoal(goal: Goal, ownerId: string, updatedGoal: UpdateGoalDto): Promise<GetSingleGoalResponseDto>;
}
