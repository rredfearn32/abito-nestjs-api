import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class LoginRequestDto {
  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  password: string;

  foo: string;
}
