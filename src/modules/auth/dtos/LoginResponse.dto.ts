import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  username: string;
}
