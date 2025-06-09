import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GoalsService } from '../modules/goals/goals.service';
export declare class GoalExistsGuard implements CanActivate {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
