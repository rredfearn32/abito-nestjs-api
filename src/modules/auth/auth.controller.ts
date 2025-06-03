import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
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
import { ERRORS } from './messages/errors';
import { instanceToPlain, plainToInstance } from 'class-transformer';

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
}
