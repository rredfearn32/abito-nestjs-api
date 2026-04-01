import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AUTH_ERRORS } from 'src/messages/auth.errors';

export default class RegisterRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: AUTH_ERRORS.USERNAME_REQUIRED })
  @MinLength(3, { message: AUTH_ERRORS.USERNAME_REQUIREMENTS_MIN })
  @MaxLength(30, { message: AUTH_ERRORS.USERNAME_REQUIREMENTS_MAX })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: AUTH_ERRORS.EMAIL_REQUIRED })
  @IsEmail({}, { message: AUTH_ERRORS.INVALID_EMAIL_FORMAT })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: AUTH_ERRORS.PASSWORD_REQUIRED })
  @MinLength(8, { message: AUTH_ERRORS.PASSWORD_REQUIREMENTS_LENGTH })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: AUTH_ERRORS.PASSWORD_REQUIREMENTS_COMPLEXITY,
  })
  password: string;
}
