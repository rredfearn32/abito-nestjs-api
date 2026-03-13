import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { GoalType } from '../../../../generated/prisma';

export class CreateGoalRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: GoalType })
  @IsEnum(GoalType)
  type: GoalType;
}

export class CreateGoalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: GoalType })
  type: GoalType;

  @Exclude()
  userId: number;
}
