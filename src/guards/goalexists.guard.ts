import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GoalsService } from '../modules/goals/goals.service';
import { ERRORS } from '../modules/goals/messages/errors';

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

    const goalIdNumber = Number(goalId);
    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(userId, goalId);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    request.goal = goal;
    return true;
  }
}
