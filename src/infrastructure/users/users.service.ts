import { Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryClient } from './repositories/users.repository-client';
import { User } from '@prisma/client';
import RegisterRequestDto from '../../modules/auth/dtos/RegisterRequestDto';
import UpdateProfileRequestDto from '../../modules/auth/dtos/UpdateProfileRequestDto';

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
    return this.usersRepositoryClient.findUser({
      id,
    });
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
