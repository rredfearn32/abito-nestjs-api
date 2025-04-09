import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class RegisterRequestDto {
  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  password: string;
}
