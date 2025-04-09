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
exports.UsersRepositoryClient = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let UsersRepositoryClient = class UsersRepositoryClient {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findUser(userWhereUniqueInput) {
        return this.prismaService.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async createUser(data) {
        return this.prismaService.user.create({
            data,
        });
    }
    async deleteUser(userId) {
        return this.prismaService.user.delete({
            where: {
                id: userId,
            },
        });
    }
};
exports.UsersRepositoryClient = UsersRepositoryClient;
exports.UsersRepositoryClient = UsersRepositoryClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepositoryClient);
//# sourceMappingURL=users.repository-client.js.map