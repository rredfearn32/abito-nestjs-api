import { RefreshTokensRepositoryClient } from './repositories/refresh-tokens.repository-client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenGenerationPayload } from './types/TokenGenerationPayload';
export declare class TokensService {
    private refreshTokensRepositoryClient;
    private jwtService;
    private configService;
    constructor(refreshTokensRepositoryClient: RefreshTokensRepositoryClient, jwtService: JwtService, configService: ConfigService);
    generateAccessToken(payload: TokenGenerationPayload): Promise<string>;
    generateRefreshToken(payload: TokenGenerationPayload): Promise<string>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    revoke(token: string): Promise<{
        id: string;
        userId: number;
        token: string;
        expiresAt: Date;
        createdAt: Date;
        revokedAt: Date | null;
    }>;
}
