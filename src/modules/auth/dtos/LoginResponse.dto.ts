import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class LoginResponseDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsEmail()
  userName: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
