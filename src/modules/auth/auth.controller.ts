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
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequest.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import GetProfileResponseDto from './dtos/GetProfileResponse.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { plainToInstance } from 'class-transformer';
import { TokensService } from '../../infrastructure/tokens/tokens.service';
import RefreshRequestDto from './dtos/RefreshRequest.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() newUser: RegisterRequestDto) {
    return this.authService.register(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequest: LoginRequestDto) {
    return this.authService.login(loginRequest.username, loginRequest.password);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('account')
  deleteAccount(@Req() req) {
    this.authService.deleteAccount(req.jwt);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<GetProfileResponseDto> {
    const user = await this.userService.findUserById(req.jwt.sub);

    return plainToInstance(GetProfileResponseDto, user);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(
    @Body() updatedProfile: UpdateProfileRequestDto,
    @Req() req: any,
  ): Promise<UpdateProfileResponseDto> {
    return this.authService.updateProfile(req.jwt, updatedProfile);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() refreshRequest: RefreshRequestDto): Promise<any> {
    return this.tokensService.refresh(refreshRequest.refreshToken);
  }
}
