import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { StreaksService } from './streaks.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [
    GoalsService,
    StreaksService,
    GoalsRepositoryClient,
    StreaksRepositoryClient,
  ],
  controllers: [GoalsController],
  exports: [StreaksService],
})
export class GoalsModule {}
