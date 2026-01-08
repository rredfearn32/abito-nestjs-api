import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokensRepositoryClient } from './repositories/refresh-tokens.repository-client';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    RefreshTokensRepositoryClient,
    TokensService,
    JwtService,
    PrismaService,
  ],
  exports: [TokensService],
})
export class TokensModule {}
