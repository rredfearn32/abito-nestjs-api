import { ApiBearerAuth } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { ERRORS } from './messages/error';

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
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
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
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const { userId, ...goalWithoutUserId } = goal;

    return goalWithoutUserId;
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createGoal(@Body() newGoalDto: CreateGoalDto, @Req() req) {
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const newGoal: NewGoal = { ...newGoalDto, userId: req.jwt.sub };

    return this.goalsService.createGoal(newGoal);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteGoal(@Param('id') goalId: string, @Req() req) {
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
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
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const { userId, ...goalWithoutUserId } = await this.goalsService.updateGoal(
      goalIdNumber,
      req.jwt.sub,
      updatedGoal,
    );

    return goalWithoutUserId;
  }

  @UseGuards(AuthGuard)
  @Post('/:id/streak')
  async createStreak(
    @Param('id') goalId: string,
    @Req() req,
    @Body() newStreak: NewStreakDto,
  ) {
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    if (goal.streaks.filter(({ inProgress }) => inProgress).length) {
      throw new BadRequestException(ERRORS.CANNOT_CREATE_NEW_STREAK);
    }

    return this.goalsService.createStreak(goalIdNumber, newStreak);
  }

  @UseGuards(AuthGuard)
  @Patch('/:goalId/streak/:streakId')
  async updateStreak(
    @Param('goalId') goalId: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const streakIdNumber = Number(streakId);

    if (isNaN(streakIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const targetStreak = goal.streaks.find(({ id }) => id === streakIdNumber);

    const canTargetStreakBeUpdated =
      !!targetStreak &&
      targetStreak.inProgress &&
      targetStreak.type === 'START';

    if (!canTargetStreakBeUpdated) {
      throw new BadRequestException(ERRORS.CANNOT_UPDATE_STREAK);
    }

    return this.goalsService.updateStreak(streakIdNumber, goalIdNumber);
  }

  @UseGuards(AuthGuard)
  @Delete('/:goalId/streak/:streakId')
  async endStreak(
    @Param('goalId') goalId: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    const user = await this.userService.findUserById(req.jwt.sub);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    const goalIdNumber = Number(goalId);

    if (isNaN(goalIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);

    if (!goal) {
      throw new NotFoundException(ERRORS.GOAL_NOT_FOUND);
    }

    const streakIdNumber = Number(streakId);

    if (isNaN(streakIdNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const targetStreak = goal.streaks.find(({ id }) => id === streakIdNumber);

    const canTargetStreakBeEnded =
      !!targetStreak &&
      targetStreak.inProgress &&
      targetStreak.type === 'START';

    if (!canTargetStreakBeEnded) {
      throw new BadRequestException(ERRORS.CANNOT_END_STREAK);
    }

    return this.goalsService.endStreak(streakIdNumber, goalIdNumber);
  }
}
