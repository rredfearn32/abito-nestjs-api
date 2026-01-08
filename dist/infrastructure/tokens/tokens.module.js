"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const refresh_tokens_repository_client_1 = require("./repositories/refresh-tokens.repository-client");
const tokens_service_1 = require("./tokens.service");
const jwt_1 = require("@nestjs/jwt");
let TokensModule = class TokensModule {
};
exports.TokensModule = TokensModule;
exports.TokensModule = TokensModule = __decorate([
    (0, common_1.Module)({
        providers: [
            refresh_tokens_repository_client_1.RefreshTokensRepositoryClient,
            tokens_service_1.TokensService,
            jwt_1.JwtService,
            prisma_service_1.PrismaService,
        ],
        exports: [tokens_service_1.TokensService],
    })
], TokensModule);
