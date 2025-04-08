import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  register() {
    return 'Register';
  }

  async login(
    username: string,
    password: string,
  ): Promise<LoginResponseDto | undefined> {
    const user = await this.userService.findUser(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    return {
      uid: user.uid,
      username: user.username,
    };
  }
}
