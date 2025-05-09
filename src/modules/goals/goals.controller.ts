import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { UsersService } from '../../infrastructure/users/users.service';
import { AllGoalsResponseDto } from './dtos/AllGoalsResponseDto';

@ApiBearerAuth()
@Controller('goals')
export class GoalsController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllGoalsForUser(@Req() req): Promise<AllGoalsResponseDto> {
    const record = await this.userService.findUserById(req.jwt.sub);

    if (!record) {
      throw new NotFoundException();
    }

    return { foo: 'bar' };
  }
}
