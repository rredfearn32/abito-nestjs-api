import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Streak } from '../types/Streak';
import { GoalType } from '../../../../generated/prisma';

export class GoalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  streaks: Streak[];

  @ApiProperty()
  type: GoalType;

  @Exclude()
  userId: number;
}
