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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../infrastructure/users/users.service");
const hashing_1 = require("./helpers/hashing");
const errors_1 = require("./messages/errors");
const tokens_service_1 = require("../../infrastructure/tokens/tokens.service");
let AuthService = class AuthService {
    constructor(userService, tokensService) {
        this.userService = userService;
        this.tokensService = tokensService;
    }
    async register(newUser) {
        newUser.password = await (0, hashing_1.hash)(newUser.password);
        const { id, username } = await this.userService.createUser(newUser);
        const tokenGenerationPayload = { sub: id };
        return {
            userId: id,
            userName: username,
            access_token: await this.tokensService.generateAccessToken(tokenGenerationPayload),
            refresh_token: await this.tokensService.generateRefreshToken(tokenGenerationPayload),
        };
    }
    async login(username, password) {
        const user = await this.userService.findUserByUsername(username);
        if (!(await (0, hashing_1.compare)(password, user?.password))) {
            throw new common_1.UnauthorizedException(errors_1.ERRORS.INVALID_CREDENTIALS);
        }
        const tokenGenerationPayload = { sub: user.id };
        return {
            userId: user.id,
            userName: user.username,
            access_token: await this.tokensService.generateAccessToken(tokenGenerationPayload),
            refresh_token: await this.tokensService.generateRefreshToken(tokenGenerationPayload),
        };
    }
    deleteAccount(jwt) {
        this.userService.deleteUser(jwt.sub);
    }
    async updateProfile(jwt, updatedProfile) {
        const user = await this.userService.findUserById(jwt.sub);
        if (updatedProfile.password) {
            updatedProfile.password = await (0, hashing_1.hash)(updatedProfile.password);
        }
        const updatedUser = { ...user, ...updatedProfile };
        return this.userService.updateUser(jwt.sub, updatedUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService])
], AuthService);
