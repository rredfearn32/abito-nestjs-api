import { ApiProperty } from '@nestjs/swagger';

export class Streak {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  inProgress: boolean;

  @ApiProperty()
  goalId: string;
}
