import { ApiProperty } from '@nestjs/swagger';
import { Streak } from '../types/Streak';
import { GoalType } from '@prisma/client';

export class GetAllGoalsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: GoalType;

  @ApiProperty({ type: Object, nullable: true })
  activeStreak: Streak | null;
}
