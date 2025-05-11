import { ApiBearerAuth } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponseDto';
import { IsNumber } from 'class-validator';

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
  @Get('/:id')
  async getGoalById(
    @Param('id') goalId: string,
    @Req() req,
  ): Promise<GetSingleGoalResponseDto | undefined> {
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException();
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException('Invalid goal id');
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException();
    }

    const { userId, ...goalWithoutUserId } = goal;

    return goalWithoutUserId;
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
