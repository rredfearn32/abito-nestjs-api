import { ApiProperty } from '@nestjs/swagger';
import { GoalType } from '@prisma/client';

export class CreateGoalResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: GoalType })
  type: GoalType;
}
