import { ApiBearerAuth } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
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
import { UpdateGoalDto } from './dtos/UpdateGoalDto';
import { NewStreakDto } from './dtos/NewStreakDto';

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
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException();
    }

    const newGoal: NewGoal = { ...newGoalDto, userId: req.jwt.sub };

    return this.goalsService.createGoal(newGoal);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteGoal(@Param('id') goalId: string, @Req() req) {
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

    const { userId, ...goalWithoutUserId } = await this.goalsService.deleteGoal(
      goalIdNumber,
      req.jwt.sub,
    );

    return goalWithoutUserId;
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateGoal(
    @Body() updatedGoal: UpdateGoalDto,
    @Param('id') goalId: string,
    @Req() req,
  ) {
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

    const { userId, ...goalWithoutUserId } = await this.goalsService.updateGoal(
      goalIdNumber,
      req.jwt.sub,
      updatedGoal,
    );

    return goalWithoutUserId;
  }

  //   TODO:
  // - ✅ Fetch current streak for goal / goals
  // - ✅ Fetch all streaks for goal
  // - ✅ Start new streak on a goal
  // - End existing streak on a goal
  // - Delete all associated streaks when a goal is deleted
  //
  //   Do we need to get streak info independent of a particular goal?
  // - NO

  @UseGuards(AuthGuard)
  @Post('/:id/streak')
  async createStreak(
    @Param('id') goalId: string,
    @Req() req,
    @Body() newStreak: NewStreakDto,
  ) {
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

    return this.goalsService.createStreak(goalIdNumber, newStreak);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/streak')
  async endStreak() {}
}
