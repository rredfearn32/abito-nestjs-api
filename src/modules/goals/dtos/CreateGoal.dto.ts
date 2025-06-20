import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateGoalRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}

export class CreateGoalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @Exclude()
  userId: number;
}
