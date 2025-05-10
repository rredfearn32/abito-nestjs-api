import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { UsersService } from '../../infrastructure/users/users.service';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dtos/CreateGoalDto';
import { NewGoal } from './types/NewGoal';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponseDto';

@ApiBearerAuth()
@Controller('goals')
export class GoalsController {
  constructor(
    private readonly userService: UsersService,
    private readonly goalsService: GoalsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllGoalsForUser(
    @Req() req,
  ): Promise<GetAllGoalsForUserResponseDto[]> {
    const record = await this.userService.findUserById(req.jwt.sub);

    if (!record) {
      throw new NotFoundException();
    }

    const goals = await this.goalsService.getUsersGoals(req.jwt.sub);

    const goalsWithoutUserIds = goals.map(({ userId, ...rest }) => rest);

    return goalsWithoutUserIds;
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createGoal(@Body() newGoalDto: CreateGoalDto, @Req() req) {
    const record = await this.userService.findUserById(req.jwt.sub);

    if (!record) {
      throw new NotFoundException();
    }

    const newGoal: NewGoal = { ...newGoalDto, userId: req.jwt.sub };

    return this.goalsService.createGoal(newGoal);
  }
}
