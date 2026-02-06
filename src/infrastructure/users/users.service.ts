import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryClient } from './repositories/users.repository-client';
import { User } from '@prisma/client';
import RegisterRequestDto from '../../modules/auth/dtos/RegisterRequest.dto';
import UpdateProfileRequestDto from '../../modules/auth/dtos/UpdateProfileRequest.dto';
import { ERRORS } from '../../modules/auth/messages/errors';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryClient)
    private usersRepositoryClient: UsersRepositoryClient,
  ) {}

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.usersRepositoryClient.findUser({
      username,
    });
  }

  async findUserById(id: number): Promise<User | undefined> {
    const user = await this.usersRepositoryClient.findUser({
      id,
    });

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(newUser: RegisterRequestDto): Promise<User | undefined> {
    return this.usersRepositoryClient.createUser(newUser);
  }

  deleteUser(id: number) {
    this.usersRepositoryClient.deleteUser(id);
  }

  updateUser(
    id: number,
    updatedProfile: UpdateProfileRequestDto,
  ): Promise<User> {
    return this.usersRepositoryClient.updateUser(id, updatedProfile);
  }
}
