import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokensRepositoryClient } from './repositories/refresh-tokens.repository-client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenGenerationPayload } from './types/TokenGenerationPayload';

@Injectable()
export class TokensService {
  constructor(
    @Inject(RefreshTokensRepositoryClient)
    private refreshTokensRepositoryClient: RefreshTokensRepositoryClient,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(payload: TokenGenerationPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async generateRefreshToken(payload: TokenGenerationPayload): Promise<string> {
    const rtId = crypto.randomUUID(); // rotation id (jti)

    const daysUntilExpiration = 14;

    const token = this.jwtService.signAsync(
      { ...payload, rtId },
      {
        expiresIn: daysUntilExpiration + 'd',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      },
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + daysUntilExpiration);

    await this.refreshTokensRepositoryClient.create(
      payload.sub,
      await token,
      expiresAt,
    );

    return token;
  }

  async refresh(refreshToken: string) {
    const tokenDoc =
      await this.refreshTokensRepositoryClient.find(refreshToken);

    if (!tokenDoc || tokenDoc.revokedAt || new Date() > tokenDoc.expiresAt) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Optional: Revoke the used token (Refresh Token Rotation)
    await this.refreshTokensRepositoryClient.revoke(refreshToken);

    // Generate new tokens
    return {
      accessToken: await this.generateAccessToken({ sub: tokenDoc.userId }),
      refreshToken: await this.generateRefreshToken({ sub: tokenDoc.userId }),
    };
  }

  async revoke(token: string) {
    return this.refreshTokensRepositoryClient.revoke(token);
  }
}
