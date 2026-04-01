import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensService } from './tokens.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensRepositoryClient } from '../../infrastructure/refresh-tokens.repository-client';

@Module({
  imports: [UsersModule, PrismaModule],
  providers: [
    AuthService,
    TokensService,
    RefreshTokensRepositoryClient,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
