import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { UsersRepositoryClient } from '../../infrastructure/users.repository-client';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepositoryClient],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
