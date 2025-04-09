import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepositoryClient } from './repositories/users.repository-client';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UsersService, UsersRepositoryClient, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
