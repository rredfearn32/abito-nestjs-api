import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Streak } from '../types/Streak';

export class GetAllGoalsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: Object, nullable: true })
  activeStreak: Streak | null;

  @Exclude()
  streaks: Streak[];

  @Exclude()
  userId: number;
}
