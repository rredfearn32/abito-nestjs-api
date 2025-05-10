import { Module } from '@nestjs/common';
import { UsersModule } from '../../infrastructure/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Module({
  providers: [
    GoalsService,
    GoalsRepositoryClient,
    PrismaService,
    ConfigService,
  ],
  controllers: [GoalsController],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1hr' },
      }),
    }),
  ],
})
export class GoalsModule {}
