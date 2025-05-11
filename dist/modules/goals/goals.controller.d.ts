import { UsersService } from '../../infrastructure/users/users.service';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dtos/CreateGoalDto';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponseDto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponseDto';
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
}
