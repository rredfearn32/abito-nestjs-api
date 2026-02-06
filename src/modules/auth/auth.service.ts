import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../infrastructure/users/users.service';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import { compare, hash } from './helpers/hashing';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import { ERRORS } from './messages/errors';
import { TokensService } from '../../infrastructure/tokens/tokens.service';
import { TokenGenerationPayload } from '../../infrastructure/tokens/types/TokenGenerationPayload';
import AuthResponseDto from './dtos/AuthResponse.dto';

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
      userName: username,
      access_token: await this.tokensService.generateAccessToken(
        tokenGenerationPayload,
      ),
      refresh_token: await this.tokensService.generateRefreshToken(
        tokenGenerationPayload,
      ),
    };
  }

  async login(username: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userService.findUserByUsername(username);
    if (!(await compare(password, user?.password))) {
      throw new UnauthorizedException(ERRORS.INVALID_CREDENTIALS);
    }

    const tokenGenerationPayload: TokenGenerationPayload = { sub: user.id };

    return {
      userId: user.id,
      userName: user.username,
      access_token: await this.tokensService.generateAccessToken(
        tokenGenerationPayload,
      ),
      refresh_token: await this.tokensService.generateRefreshToken(
        tokenGenerationPayload,
      ),
    };
  }

  deleteAccount(jwt: DeleteAccountRequestDto) {
    this.userService.deleteUser(jwt.sub);
  }

  async updateProfile(
    jwt: any,
    updatedProfile: UpdateProfileRequestDto,
  ): Promise<UpdateProfileResponseDto> {
    const user = await this.userService.findUserById(jwt.sub);
    if (updatedProfile.password) {
      updatedProfile.password = await hash(updatedProfile.password);
    }
    const updatedUser = { ...user, ...updatedProfile };
    return this.userService.updateUser(jwt.sub, updatedUser);
  }
}
