import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class RegisterResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail()
  username: string;
}
