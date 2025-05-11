import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGoalDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;
}
