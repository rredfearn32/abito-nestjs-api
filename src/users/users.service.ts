import { Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryClient } from './repositories/users.repository-client';
import { User } from '@prisma/client';
import RegisterRequestDto from '../auth/dtos/RegisterRequestDto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryClient)
    private usersRepositoryClient: UsersRepositoryClient,
  ) {}

  async findUser(username: string): Promise<User | undefined> {
    return this.usersRepositoryClient.findUser({
      username,
    });
  }

  async createUser(newUser: RegisterRequestDto): Promise<User | undefined> {
    return this.usersRepositoryClient.createUser(newUser);
  }
}
