import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { GoalType } from '../../../../generated/prisma';

export class DeleteGoalResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: GoalType;

  @Exclude()
  userId: string;
}
