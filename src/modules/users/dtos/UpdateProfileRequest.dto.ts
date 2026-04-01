import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export default class UpdateProfileRequestDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'PASSWORD_REQUIREMENTS_LENGTH' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'PASSWORD_REQUIREMENTS_COMPLEXITY',
  })
  password: string;
}
