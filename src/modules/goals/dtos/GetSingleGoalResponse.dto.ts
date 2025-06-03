import { ApiProperty } from '@nestjs/swagger';

export class GetSingleGoalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
