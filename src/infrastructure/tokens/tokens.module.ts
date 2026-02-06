import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RefreshTokensRepositoryClient } from './repositories/refresh-tokens.repository-client';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  providers: [RefreshTokensRepositoryClient, TokensService, JwtService],
  exports: [TokensService],
})
export class TokensModule {}
