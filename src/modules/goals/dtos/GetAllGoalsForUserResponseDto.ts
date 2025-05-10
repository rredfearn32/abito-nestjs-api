import { ApiProperty } from '@nestjs/swagger';

export class GetAllGoalsForUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
