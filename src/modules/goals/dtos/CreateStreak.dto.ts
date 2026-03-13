import { ApiProperty } from '@nestjs/swagger';

export class CreateStreakResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  inProgress: boolean;

  @ApiProperty()
  goalId: number;
}
