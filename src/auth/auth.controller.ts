import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequestDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {
    return this.authService.register();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequest: LoginRequestDto) {
    return this.authService.login(loginRequest.username, loginRequest.password);
  }
}
