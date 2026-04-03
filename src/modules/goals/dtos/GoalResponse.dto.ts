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

  @ApiProperty({ type: Streak, nullable: true })
  activeStreak: Streak | null;

  @ApiProperty({ type: [Streak] })
  previousStreaks: Streak[];
}
