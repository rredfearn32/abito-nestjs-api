import { ApiProperty } from '@nestjs/swagger';

export class CreateStreakResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  inProgress: boolean;

  @ApiProperty()
  goalId: string;
}
