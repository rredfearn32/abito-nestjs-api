import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export default class GetProfileResponseDto {
  @ApiProperty()
  @IsEmail()
  username: string;

  @Exclude()
  password: string;
}
