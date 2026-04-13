import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_ERROR } from '../../messages/users.errors';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import { UsersRepositoryClient } from '../../infrastructure/users.repository-client';
import { hash } from '../../utils/hashing';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryClient)
    private usersRepositoryClient: UsersRepositoryClient,
  ) {}

  async findUserByUsername(username: string) {
    const user = await this.usersRepositoryClient.findUserByUsername(username);

    if (!user) {
      throw new NotFoundException(USER_ERROR.USER_NOT_FOUND);
    }

    return user;
  }

  async findUserById(userId: string) {
    const user = await this.usersRepositoryClient.findUserById(userId);

    if (!user) {
      throw new NotFoundException(USER_ERROR.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(newUser: Prisma.UserCreateInput) {
    try {
      return await this.usersRepositoryClient.createUser(newUser);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(USER_ERROR.USERNAME_TAKEN);
      }
      throw e;
    }
  }

  deleteUser(userId: string) {
    return this.usersRepositoryClient.deleteUser(userId);
  }

  async updateProfile(userId: string, updatedProfile: UpdateProfileRequestDto) {
    const data: Prisma.UserUpdateInput = {};

    if (updatedProfile.email) {
      data.email = updatedProfile.email;
    }
    if (updatedProfile.password) {
      data.password = await hash(updatedProfile.password);
    }

    return this.usersRepositoryClient.updateUser(userId, data);
  }
}
