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
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const hashing_1 = require("./helpers/hashing");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(newUser) {
        newUser.password = await (0, hashing_1.hash)(newUser.password);
        const { id, username } = await this.userService.createUser(newUser);
        const result = { sub: id, username };
        return { ...result, access_token: await this.jwtService.signAsync(result) };
    }
    async login(username, password) {
        const user = await this.userService.findUserByUsername(username);
        if (!(await (0, hashing_1.compare)(password, user?.password))) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            sub: user.id,
            username: user.username,
        };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
    deleteAccount(jwt) {
        this.userService.deleteUser(jwt.sub);
    }
    updateProfile(jwt, updatedProfile) {
        const user = this.userService.findUserById(jwt.sub);
        const updatedUser = { ...user, ...updatedProfile };
        return this.userService.updateUser(jwt.sub, updatedUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map