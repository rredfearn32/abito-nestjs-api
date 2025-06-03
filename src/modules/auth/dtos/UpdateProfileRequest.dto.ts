import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export default class UpdateProfileRequestDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  password: string;
}
