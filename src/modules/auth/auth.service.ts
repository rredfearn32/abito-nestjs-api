import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../infrastructure/users/users.service';
import LoginResponseDto from './dtos/LoginResponse.dto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import RegisterResponseDto from './dtos/RegisterResponse.dto';
import { compare, hash } from './helpers/hashing';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import { ERRORS } from './messages/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: RegisterRequestDto): Promise<RegisterResponseDto> {
    newUser.password = await hash(newUser.password);
    const { id, username } = await this.userService.createUser(newUser);
    const result = { sub: id, username };
    return { ...result, access_token: await this.jwtService.signAsync(result) };
  }

  async login(username: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findUserByUsername(username);
    if (!(await compare(password, user?.password))) {
      throw new UnauthorizedException(ERRORS.INVALID_CREDENTIALS);
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
    };
  }

  deleteAccount(jwt: DeleteAccountRequestDto) {
    this.userService.deleteUser(jwt.sub);
  }

  async updateProfile(
    jwt: any,
    updatedProfile: UpdateProfileRequestDto,
  ): Promise<UpdateProfileResponseDto> {
    const user = this.userService.findUserById(jwt.sub);
    if (updatedProfile.password) {
      updatedProfile.password = await hash(updatedProfile.password);
    }
    const updatedUser = { ...user, ...updatedProfile };
    return this.userService.updateUser(jwt.sub, updatedUser);
  }
}
