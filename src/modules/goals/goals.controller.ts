import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';
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
import { GoalResponseDto } from './dtos/GoalResponse.dto';
import { UpdateGoalDto } from './dtos/UpdateGoal.dto';
import { CreateStreakResponseDto } from './dtos/CreateStreakResponse.dto';
import { CreateGoalRequestDto } from './dtos/CreateGoalRequest.dto';
import { CreateGoalResponseDto } from './dtos/CreateGoalResponse.dto';
import { DeleteGoalResponseDto } from './dtos/DeleteGoal.dto';
import { StreaksService } from './streaks.service';
import { UserExistsGuard } from '../../guards/userexists.guard';
import { GoalExistsGuard } from '../../guards/goalexists.guard';
import { GetAllGoalsResponseDto } from './dtos/GetAllGoalsResponse.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Goals')
@ApiBearerAuth()
@Controller('goals')
@UseGuards(AuthGuard, UserExistsGuard, GoalExistsGuard)
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
    private readonly streaksService: StreaksService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all goals for the authenticated user' })
  @ApiOkResponse({ type: [GetAllGoalsResponseDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getAllGoalsForUser(@Req() req): Promise<GetAllGoalsResponseDto[]> {
    const goals = await this.goalsService.getAllGoalsForUser(req.jwt.sub);

    return plainToInstance(
      GetAllGoalsResponseDto,
      goals.map((goal) => this.goalsService.toGoalView(goal, false)),
    );
  }

  @Get('/:goalId')
  @ApiOperation({ summary: 'Get a goal by ID' })
  @ApiParam({ name: 'goalId', description: 'Numeric ID of the goal' })
  @ApiOkResponse({ type: GoalResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Goal not found' })
  async getGoalById(
    @Param('goalId') _: string,
    @Req() req,
  ): Promise<GoalResponseDto> {
    return plainToInstance(
      GoalResponseDto,
      this.goalsService.toGoalView(req.goal),
    );
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new goal' })
  @ApiCreatedResponse({ type: CreateGoalResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createGoal(@Body() newGoalDto: CreateGoalRequestDto, @Req() req) {
    const newGoal = await this.goalsService.createGoal(newGoalDto, req.jwt.sub);

    return plainToInstance(
      CreateGoalResponseDto,
      this.goalsService.toGoalView(newGoal),
    );
  }

  @Delete('/:goalId')
  @ApiOperation({ summary: 'Delete a goal' })
  @ApiParam({ name: 'goalId', description: 'Numeric ID of the goal to delete' })
  @ApiOkResponse({ type: DeleteGoalResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Goal not found' })
  async deleteGoal(@Param('goalId') _: string, @Req() req) {
    const deletedGoal = await this.goalsService.deleteGoal(
      req.goal,
      req.jwt.sub,
    );
    return plainToInstance(
      DeleteGoalResponseDto,
      this.goalsService.toGoalView(deletedGoal),
    );
  }

  @Patch('/:goalId')
  @ApiOperation({ summary: "Update a goal's properties (e.g. title)" })
  @ApiParam({ name: 'goalId', description: 'Numeric ID of the goal to update' })
  @ApiOkResponse({ type: GoalResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Goal not found' })
  async updateGoal(
    @Param('goalId') _: string,
    @Body() goalUpdates: UpdateGoalDto,
    @Req() req,
  ) {
    const updatedGoal = await this.goalsService.updateGoal(
      req.goal,
      req.jwt.sub,
      goalUpdates,
    );
    return plainToInstance(
      GoalResponseDto,
      this.goalsService.toGoalView(updatedGoal),
    );
  }

  @Post('/:goalId/streaks')
  @ApiOperation({ summary: 'Start a new streak for a goal' })
  @ApiParam({ name: 'goalId', description: 'Numeric ID of the goal' })
  @ApiCreatedResponse({ type: CreateStreakResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid ID format, or a streak is already in progress',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Goal not found' })
  async createStreak(@Param('goalId') _: string, @Req() req) {
    const createdStreak = await this.streaksService.createStreak(req.goal);
    return plainToInstance(CreateStreakResponseDto, createdStreak);
  }

  @Patch('/:goalId/streaks/:streakId')
  @ApiOperation({ summary: 'Record a check-in on a streak for a START goal' })
  @ApiParam({ name: 'goalId', description: 'Numeric ID of the goal' })
  @ApiParam({ name: 'streakId', description: 'Numeric ID of the streak' })
  @ApiOkResponse({ description: 'Updated streak' })
  @ApiBadRequestResponse({
    description:
      'Invalid ID format, or streak cannot be updated (not in progress / wrong type)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Goal not found' })
  async updateStreak(
    @Param('goalId') _: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    return this.streaksService.updateStreak(streakId, req.goal);
  }

  @Delete('/:goalId/streaks/:streakId')
  @ApiOperation({ summary: 'End an in-progress streak' })
  @ApiParam({ name: 'goalId', description: 'Numeric ID of the goal' })
  @ApiParam({ name: 'streakId', description: 'Numeric ID of the streak' })
  @ApiOkResponse({ description: 'Ended streak' })
  @ApiBadRequestResponse({
    description:
      'Invalid ID format, or streak cannot be ended (not in progress / wrong type)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Goal not found' })
  async endStreak(
    @Param('goalId') _: string,
    @Param('streakId') streakId: string,
    @Req() req,
  ) {
    return this.streaksService.endStreak(streakId, req.goal);
  }
}
