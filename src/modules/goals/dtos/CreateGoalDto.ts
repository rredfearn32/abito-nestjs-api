import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
