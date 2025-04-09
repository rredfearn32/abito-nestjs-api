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
import LoginRequestDto from './dtos/LoginRequestDto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import RegisterRequestDto from './dtos/RegisterRequestDto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequestDto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponseDto';
import { UsersService } from '../users/users.service';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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
  getProfile(@Req() req) {
    return this.userService.findUserById(req.jwt.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(
    @Body() updatedProfile: UpdateProfileRequestDto,
    @Req() req: any,
  ): Promise<UpdateProfileResponseDto> {
    return this.authService.updateProfile(req.jwt, updatedProfile);
  }
}
