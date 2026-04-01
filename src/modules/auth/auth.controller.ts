import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequest.dto';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import AuthResponseDto from './dtos/AuthResponse.dto';
import RefreshRequestDto from './dtos/RefreshRequest.dto';
import { TokensService } from './tokens.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  register(@Body() newUser: RegisterRequestDto) {
    return this.authService.register(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Log in with email and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Body() loginRequest: LoginRequestDto) {
    return this.authService.login(loginRequest.username, loginRequest.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
  async refresh(@Body() refreshRequest: RefreshRequestDto): Promise<any> {
    return this.tokensService.refresh(refreshRequest.refreshToken);
  }
}
