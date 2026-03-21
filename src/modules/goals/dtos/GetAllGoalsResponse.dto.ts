import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Streak } from '../types/Streak';
import { GoalType } from '../../../../generated/prisma';

export class GetAllGoalsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: GoalType;

  @ApiProperty({ type: Object, nullable: true })
  activeStreak: Streak | null;

  @Exclude()
  streaks: Streak[];

  @Exclude()
  userId: string;
}
