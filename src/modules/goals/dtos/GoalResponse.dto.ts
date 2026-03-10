import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Streak } from '../types/Streak';

export class GoalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  streaks: Streak[];

  @Exclude()
  userId: number;
}
