import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepositoryClient } from './repositories/users.repository-client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepositoryClient],
  exports: [UsersService],
})
export class UsersModule {}
