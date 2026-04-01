import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GoalsService } from '../modules/goals/goals.service';

@Injectable()
export class GoalExistsGuard implements CanActivate {
  constructor(private readonly goalsService: GoalsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.jwt.sub;
    const goalId = request.params.goalId;

    if (!goalId) {
      return true;
    }

    request.goal = await this.goalsService.findSingleGoalById(userId, goalId);
    return true;
  }
}
