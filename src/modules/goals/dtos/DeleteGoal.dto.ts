import { ApiProperty } from '@nestjs/swagger';
import { GoalType } from '@prisma/client';

export class DeleteGoalResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: GoalType;
}
