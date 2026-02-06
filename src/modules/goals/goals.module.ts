import { Module } from '@nestjs/common';
import { UsersModule } from '../../infrastructure/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { StreaksService } from './streaks.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
      }),
    }),
  ],
  providers: [
    GoalsService,
    StreaksService,
    GoalsRepositoryClient,
    StreaksRepositoryClient,
  ],
  controllers: [GoalsController],
})
export class GoalsModule {}
