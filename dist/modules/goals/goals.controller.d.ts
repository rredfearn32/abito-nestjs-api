import { UsersService } from '../../infrastructure/users/users.service';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dtos/CreateGoalDto';
export declare class GoalsController {
    private readonly userService;
    private readonly goalsService;
    constructor(userService: UsersService, goalsService: GoalsService);
    getAllGoalsForUser(req: any): Promise<{
        title: string;
    }>;
    createGoal(newGoalDto: CreateGoalDto, req: any): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
}
