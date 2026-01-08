"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const refresh_tokens_repository_client_1 = require("./repositories/refresh-tokens.repository-client");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let TokensService = class TokensService {
    constructor(refreshTokensRepositoryClient, jwtService, configService) {
        this.refreshTokensRepositoryClient = refreshTokensRepositoryClient;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async generateAccessToken(payload) {
        return this.jwtService.signAsync(payload, {
            expiresIn: '10m',
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
    }
    async generateRefreshToken(payload) {
        const rtId = crypto.randomUUID();
        const daysUntilExpiration = 14;
        const token = this.jwtService.signAsync({ ...payload, rtId }, {
            expiresIn: daysUntilExpiration + 'd',
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + daysUntilExpiration);
        await this.refreshTokensRepositoryClient.create(payload.sub, await token, expiresAt);
        return token;
    }
    async refresh(refreshToken) {
        const tokenDoc = await this.refreshTokensRepositoryClient.find(refreshToken);
        if (!tokenDoc || tokenDoc.revokedAt || new Date() > tokenDoc.expiresAt) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        await this.refreshTokensRepositoryClient.revoke(refreshToken);
        return {
            accessToken: await this.generateAccessToken({ sub: tokenDoc.userId }),
            refreshToken: await this.generateRefreshToken({ sub: tokenDoc.userId }),
        };
    }
    async revoke(token) {
        return this.refreshTokensRepositoryClient.revoke(token);
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(refresh_tokens_repository_client_1.RefreshTokensRepositoryClient)),
    __metadata("design:paramtypes", [refresh_tokens_repository_client_1.RefreshTokensRepositoryClient,
        jwt_1.JwtService,
        config_1.ConfigService])
], TokensService);
