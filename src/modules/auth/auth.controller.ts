import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequest.dto';
import { AuthGuard } from '../../guards/auth.guard';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import GetProfileResponseDto from './dtos/GetProfileResponse.dto';
import AuthResponseDto from './dtos/AuthResponse.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { plainToInstance } from 'class-transformer';
import { TokensService } from '../../infrastructure/tokens/tokens.service';
import RefreshRequestDto from './dtos/RefreshRequest.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly userService: UsersService,
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('account')
  @ApiOperation({ summary: "Delete the authenticated user's account" })
  @ApiOkResponse({ description: 'Account deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  deleteAccount(@Req() req) {
    this.authService.deleteAccount(req.jwt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: "Get the authenticated user's profile" })
  @ApiOkResponse({ type: GetProfileResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@Req() req): Promise<GetProfileResponseDto> {
    const user = await this.userService.findUserById(req.jwt.sub);

    return plainToInstance(GetProfileResponseDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: "Update the authenticated user's profile" })
  @ApiOkResponse({ type: UpdateProfileResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateProfile(
    @Body() updatedProfile: UpdateProfileRequestDto,
    @Req() req: any,
  ): Promise<UpdateProfileResponseDto> {
    return this.authService.updateProfile(req.jwt, updatedProfile);
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
