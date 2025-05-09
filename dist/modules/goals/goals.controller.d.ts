import { UsersService } from '../../infrastructure/users/users.service';
import { AllGoalsResponseDto } from './dtos/AllGoalsResponseDto';
export declare class GoalsController {
    private readonly userService;
    constructor(userService: UsersService);
    getAllGoalsForUser(req: any): Promise<AllGoalsResponseDto>;
}
