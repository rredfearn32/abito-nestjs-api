import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GoalType } from '@prisma/client';

export class CreateGoalRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: GoalType })
  @IsEnum(GoalType)
  type: GoalType;
}
