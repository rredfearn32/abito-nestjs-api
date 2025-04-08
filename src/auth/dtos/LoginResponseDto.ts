import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponseDto {
  @ApiProperty()
  uid: string;
  @ApiProperty()
  username: string;
}
