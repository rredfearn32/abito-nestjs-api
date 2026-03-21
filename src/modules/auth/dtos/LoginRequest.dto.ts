import { ApiProperty } from '@nestjs/swagger';

export default class LoginRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
