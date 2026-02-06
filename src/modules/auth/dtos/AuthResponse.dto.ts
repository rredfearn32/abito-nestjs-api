import { ApiProperty } from '@nestjs/swagger';

export default class AuthResponseDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
