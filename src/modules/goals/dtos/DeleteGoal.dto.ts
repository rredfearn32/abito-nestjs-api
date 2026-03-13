import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { GoalType } from '../../../../generated/prisma';

export class DeleteGoalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: GoalType;

  @Exclude()
  userId: number;
}
