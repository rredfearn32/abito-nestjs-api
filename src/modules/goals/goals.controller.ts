import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { GoalsService } from './goals.service';
import { GoalsResponseDto } from './dtos/GoalsResponse.dto';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { CreateGoalRequestDto } from './dtos/CreateGoal.dto';
import { StreaksService } from './streaks.service';
import { UserExistsGuard } from '../../guards/userexists.guard';
import { GoalExistsGuard } from '../../guards/goalexists.guard';

@ApiBearerAuth()
@Controller('goals')
@UseGuards(AuthGuard, UserExistsGuard, GoalExistsGuard)
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
    private readonly streaksService: StreaksService,
  ) {}

  @Get('/')
  async getAllGoalsForUser(@Req() req): Promise<GoalsResponseDto[]> {
    return this.goalsService.getUsersGoals(req.jwt.sub);
  }

  @Get('/:goalId')
  async getGoalById(
    @Param('goalId') goalId: string,
    @Req() req,
  ): Promise<GoalsResponseDto | undefined> {
    return this.goalsService.getGoalById(req.jwt.sub, goalId);
  }

  @Post('/')
  async createGoal(@Body() newGoalDto: CreateGoalRequestDto, @Req() req) {
    return this.goalsService.createGoal(newGoalDto, req.jwt.sub);
  }

  @Delete('/:goalId')
  async deleteGoal(@Param('goalId') _: string, @Req() req) {
    return this.goalsService.deleteGoal(req.goal, req.jwt.sub);
  }

  @Patch('/:goalId')
  async updateGoal(
    @Param('goalId') _: string,
    @Body() updatedGoal: UpdateGoalDto,
    @Req() req,
  ) {
    return this.goalsService.updateGoal(req.goal, req.jwt.sub, updatedGoal);
  }

  @Post('/:goalId/streaks')
  async createStreak(
    @Param('goalId') _: string,
    @Req() req,
    @Body() newStreak: NewStreakDto,
  ) {
    return this.streaksService.createStreak(req.goal, newStreak);
  }

  @Patch('/:goalId/streaks/:streakId')
  async updateStreak(
    @Param('goalId') _: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    return this.streaksService.updateStreak(streakId, req.goal);
  }

  @Delete('/:goalId/streaks/:streakId')
  async endStreak(
    @Param('goalId') _: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    return this.streaksService.endStreak(streakId, req.goal);
  }
}
