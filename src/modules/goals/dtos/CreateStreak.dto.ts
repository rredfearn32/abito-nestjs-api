import { StreakType } from '../../../../generated/prisma';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class NewStreakDto {
  @IsNotEmpty()
  @IsEnum(StreakType)
  type: StreakType;
}

export class CreateStreakResponseDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: StreakType;
  inProgress: boolean;
  goalId: number;
}
