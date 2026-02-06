import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../infrastructure/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokensService } from '../../infrastructure/tokens/tokens.service';
import { RefreshTokensRepositoryClient } from '../../infrastructure/tokens/repositories/refresh-tokens.repository-client';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        global: true,
      }),
    }),
  ],
  providers: [AuthService, TokensService, RefreshTokensRepositoryClient],
  controllers: [AuthController],
})
export class AuthModule {}
