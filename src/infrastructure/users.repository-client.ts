import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UsersRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  findUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  createUser(newUser: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: newUser,
    });
  }

  deleteUser(userId: string) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  updateUser(id: string, updatedUser: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }
}
