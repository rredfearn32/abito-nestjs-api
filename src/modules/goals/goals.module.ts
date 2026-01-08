import { Module } from '@nestjs/common';
import { UsersModule } from '../../infrastructure/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { StreaksRepositoryClient } from './repositories/streaks.repository-client';
import { StreaksService } from './streaks.service';

@Module({
  providers: [
    GoalsService,
    StreaksService,
    GoalsRepositoryClient,
    StreaksRepositoryClient,
    PrismaService,
    ConfigService,
  ],
  controllers: [GoalsController],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        global: true,
      }),
    }),
  ],
})
export class GoalsModule {}
