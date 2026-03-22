import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepositoryClient } from './repositories/users.repository-client';
import { User, Prisma } from 'generated/prisma';
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

  async findUserById(id: string): Promise<User | undefined> {
    const user = await this.usersRepositoryClient.findUser({
      id,
    });

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(newUser: RegisterRequestDto): Promise<User | undefined> {
    try {
      return await this.usersRepositoryClient.createUser(newUser);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(ERRORS.USERNAME_TAKEN);
      }
      throw e;
    }
  }

  deleteUser(id: string) {
    this.usersRepositoryClient.deleteUser(id);
  }

  updateUser(
    id: string,
    updatedProfile: UpdateProfileRequestDto,
  ): Promise<User> {
    return this.usersRepositoryClient.updateUser(id, updatedProfile);
  }
}
