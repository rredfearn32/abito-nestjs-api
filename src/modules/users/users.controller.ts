import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { plainToInstance } from 'class-transformer';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UserResponseDto from './dtos/UserResponse.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: "Get the authenticated user's profile" })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@Req() req): Promise<UserResponseDto> {
    const user = await this.userService.findUserById(req.jwt.sub);

    return plainToInstance(UserResponseDto, {
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: "Update the authenticated user's profile" })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateProfile(
    @Body() updatedProfile: UpdateProfileRequestDto,
    @Req() req: any,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.userService.updateProfile(
      req.jwt.sub,
      updatedProfile,
    );

    return plainToInstance(UserResponseDto, {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('account')
  @ApiOperation({ summary: "Delete the authenticated user's account" })
  @ApiOkResponse({ description: 'Account deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  deleteAccount(@Req() req) {
    return plainToInstance(
      UserResponseDto,
      this.userService.deleteUser(req.jwt.sub),
    );
  }
}
