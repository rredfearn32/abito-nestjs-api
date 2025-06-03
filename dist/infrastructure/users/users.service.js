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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_client_1 = require("./repositories/users.repository-client");
const errors_1 = require("../../modules/auth/messages/errors");
let UsersService = class UsersService {
    constructor(usersRepositoryClient) {
        this.usersRepositoryClient = usersRepositoryClient;
    }
    async findUserByUsername(username) {
        return this.usersRepositoryClient.findUser({
            username,
        });
    }
    async findUserById(id) {
        const user = this.usersRepositoryClient.findUser({
            id,
        });
        if (!user) {
            throw new common_1.NotFoundException(errors_1.ERRORS.USER_NOT_FOUND);
        }
        return user;
    }
    async createUser(newUser) {
        return this.usersRepositoryClient.createUser(newUser);
    }
    deleteUser(id) {
        this.usersRepositoryClient.deleteUser(id);
    }
    updateUser(id, updatedProfile) {
        return this.usersRepositoryClient.updateUser(id, updatedProfile);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_repository_client_1.UsersRepositoryClient)),
    __metadata("design:paramtypes", [users_repository_client_1.UsersRepositoryClient])
], UsersService);
//# sourceMappingURL=users.service.js.map