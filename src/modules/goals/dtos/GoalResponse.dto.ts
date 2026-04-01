import { ApiProperty } from '@nestjs/swagger';
import { Streak } from '../types/Streak';
import { GoalType } from '../../../../generated/prisma';

export class GoalResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: GoalType;

  @ApiProperty({ type: Object, nullable: true })
  activeStreak: Streak | null;

  @ApiProperty()
  previousStreaks: Streak[];
}
