import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequestDto';
import RegisterResponseDto from './dtos/RegisterResponseDto';
import { compare, hash } from './helpers/hashing';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequestDto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequestDto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponseDto';

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
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
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
