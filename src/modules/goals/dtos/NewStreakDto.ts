import { StreakType } from '../../../../generated/prisma';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class NewStreakDto {
  @IsNotEmpty()
  @IsEnum(StreakType)
  type: StreakType;
}
