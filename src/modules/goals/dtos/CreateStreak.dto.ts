import { StreakType } from '../../../../generated/prisma';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewStreakDto {
  @ApiProperty({ enum: StreakType })
  @IsNotEmpty()
  @IsEnum(StreakType)
  type: StreakType;
}

export class CreateStreakResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ enum: StreakType })
  type: StreakType;

  @ApiProperty()
  inProgress: boolean;

  @ApiProperty()
  goalId: number;
}
