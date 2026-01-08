"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("../../infrastructure/users/users.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const goals_controller_1 = require("./goals.controller");
const goals_service_1 = require("./goals.service");
const goals_repository_client_1 = require("./repositories/goals.repository-client");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const streaks_repository_client_1 = require("./repositories/streaks.repository-client");
const streaks_service_1 = require("./streaks.service");
let GoalsModule = class GoalsModule {
};
exports.GoalsModule = GoalsModule;
exports.GoalsModule = GoalsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            goals_service_1.GoalsService,
            streaks_service_1.StreaksService,
            goals_repository_client_1.GoalsRepositoryClient,
            streaks_repository_client_1.StreaksRepositoryClient,
            prisma_service_1.PrismaService,
            config_1.ConfigService,
        ],
        controllers: [goals_controller_1.GoalsController],
        imports: [
            users_module_1.UsersModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: () => ({
                    global: true,
                }),
            }),
        ],
    })
], GoalsModule);
