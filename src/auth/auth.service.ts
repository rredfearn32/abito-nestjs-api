import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequestDto';
import RegisterResponseDto from './dtos/RegisterResponseDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { id, username } = await this.userService.createUser(newUser);
    return { id, username };
  }

  async login(username: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findUser(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
