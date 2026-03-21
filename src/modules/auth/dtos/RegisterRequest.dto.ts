import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class RegisterRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'USERNAME_REQUIREMENTS_MIN' })
  @MaxLength(30, { message: 'USERNAME_REQUIREMENTS_MAX' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username is required' })
  @IsEmail()
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
