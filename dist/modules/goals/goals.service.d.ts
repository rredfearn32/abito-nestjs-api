import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponse.dto';
import { DeleteGoalResponseDto } from './dtos/DeleteGoal.dto';
import { CreateGoalRequestDto, CreateGoalResponseDto } from './dtos/CreateGoal.dto';
export declare class GoalsService {
    private goalsRepositoryClient;
    private readonly userService;
    constructor(goalsRepositoryClient: GoalsRepositoryClient, userService: UsersService);
    createGoal(newGoalDto: CreateGoalRequestDto, userId: number): Promise<CreateGoalResponseDto>;
    getUsersGoals(userId: number): Promise<GetAllGoalsForUserResponseDto[]>;
    getGoalById(userId: number, goalId: string): Promise<GetSingleGoalResponseDto>;
    deleteGoal(goalId: string, ownerId: string): Promise<DeleteGoalResponseDto>;
    updateGoal(goalId: string, ownerId: string, updatedGoal: UpdateGoalDto): Promise<GetSingleGoalResponseDto>;
}
