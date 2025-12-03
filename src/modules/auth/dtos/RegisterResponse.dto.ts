import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class RegisterResponseDto {
  @ApiProperty()
  sub: number;

  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
