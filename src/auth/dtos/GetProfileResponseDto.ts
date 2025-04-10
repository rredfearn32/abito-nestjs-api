import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class GetProfileResponseDto {
  @ApiProperty()
  @IsEmail()
  username: string;
}
