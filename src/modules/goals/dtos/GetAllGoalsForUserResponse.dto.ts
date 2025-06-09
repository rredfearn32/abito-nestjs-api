import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetAllGoalsForUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @Exclude()
  userId: number;
}
