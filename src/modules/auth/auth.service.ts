import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import { compare, hash } from '../../utils/hashing';
import { AUTH_ERRORS } from '../../messages/auth.errors';
import AuthResponseDto from './dtos/AuthResponse.dto';
import { TokensService } from './tokens.service';
import { TokenGenerationPayload } from './types/TokenGenerationPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async register(newUser: RegisterRequestDto): Promise<AuthResponseDto> {
    newUser.password = await hash(newUser.password);
    const { id, username } = await this.userService.createUser(newUser);

    const tokenGenerationPayload: TokenGenerationPayload = { sub: id };

    return {
      userId: id,
      username: username,
      accessToken: await this.tokensService.generateAccessToken(
        tokenGenerationPayload,
      ),
      refreshToken: await this.tokensService.generateRefreshToken(
        tokenGenerationPayload,
      ),
    };
  }

  async login(username: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userService.findUserByUsername(username);

    // Check if there's a provided password, and the password entered matches the user's recorded one
    if (!user?.password || !(await compare(password, user?.password))) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const tokenGenerationPayload: TokenGenerationPayload = { sub: user.id };

    return {
      userId: user.id,
      username: user.username,
      accessToken: await this.tokensService.generateAccessToken(
        tokenGenerationPayload,
      ),
      refreshToken: await this.tokensService.generateRefreshToken(
        tokenGenerationPayload,
      ),
    };
  }
}
