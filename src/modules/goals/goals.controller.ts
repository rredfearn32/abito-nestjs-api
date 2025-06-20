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
import { UsersService } from '../../infrastructure/users/users.service';
import { GoalsService } from './goals.service';
import { GetAllGoalsForUserResponseDto } from './dtos/GetAllGoalsForUserResponse.dto';
import { GetSingleGoalResponseDto } from './dtos/GetSingleGoalResponse.dto';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { NewStreakDto } from './dtos/CreateStreak.dto';
import { CreateGoalRequestDto } from './dtos/CreateGoal.dto';
import { StreaksService } from './streaks.service';

@ApiBearerAuth()
@Controller('goals')
export class GoalsController {
  constructor(
    private readonly userService: UsersService,
    private readonly goalsService: GoalsService,
    private readonly streaksService: StreaksService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllGoalsForUser(
    @Req() req,
  ): Promise<GetAllGoalsForUserResponseDto[]> {
    return this.goalsService.getUsersGoals(req.jwt.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getGoalById(
    @Param('id') goalId: string,
    @Req() req,
  ): Promise<GetSingleGoalResponseDto | undefined> {
    return this.goalsService.getGoalById(req.jwt.sub, goalId);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createGoal(@Body() newGoalDto: CreateGoalRequestDto, @Req() req) {
    return this.goalsService.createGoal(newGoalDto, req.jwt.sub);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteGoal(@Param('id') goalId: string, @Req() req) {
    return this.goalsService.deleteGoal(goalId, req.jwt.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateGoal(
    @Body() updatedGoal: UpdateGoalDto,
    @Param('id') goalId: string,
    @Req() req,
  ) {
    return this.goalsService.updateGoal(goalId, req.jwt.sub, updatedGoal);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/streak')
  async createStreak(
    @Param('id') goalId: string,
    @Req() req,
    @Body() newStreak: NewStreakDto,
  ) {
    return this.streaksService.createStreak(goalId, req.jwt.sub, newStreak);
  }

  @UseGuards(AuthGuard)
  @Patch('/:goalId/streak/:streakId')
  async updateStreak(
    @Param('goalId') goalId: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    return this.streaksService.updateStreak(streakId, req.jwt.sub, goalId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:goalId/streak/:streakId')
  async endStreak(
    @Param('goalId') goalId: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    return this.streaksService.endStreak(streakId, req.jwt.sub, goalId);
  }
}
