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
exports.StreaksService = void 0;
const common_1 = require("@nestjs/common");
const streaks_repository_client_1 = require("./repositories/streaks.repository-client");
const users_service_1 = require("../../infrastructure/users/users.service");
const error_1 = require("./messages/error");
const goals_service_1 = require("./goals.service");
const class_transformer_1 = require("class-transformer");
const CreateStreak_dto_1 = require("./dtos/CreateStreak.dto");
const auth_guard_1 = require("../../guards/auth.guard");
const userexists_guard_1 = require("../../guards/userexists.guard");
let StreaksService = class StreaksService {
    constructor(streaksRepositoryClient, userService, goalsService) {
        this.streaksRepositoryClient = streaksRepositoryClient;
        this.userService = userService;
        this.goalsService = goalsService;
    }
    async createStreak(goal, newStreak) {
        if (goal.streaks.filter(({ inProgress }) => inProgress).length) {
            throw new common_1.BadRequestException(error_1.ERRORS.CANNOT_CREATE_NEW_STREAK);
        }
        const createdStreak = this.streaksRepositoryClient.createStreak(goal.id, newStreak);
        return (0, class_transformer_1.plainToInstance)(CreateStreak_dto_1.CreateStreakResponseDto, createdStreak);
    }
    async updateStreak(streakId, goal) {
        const streakIdNumber = Number(streakId);
        if (isNaN(streakIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const targetStreak = goal.streaks.find(({ id }) => id === streakIdNumber);
        const canTargetStreakBeUpdated = !!targetStreak &&
            targetStreak.inProgress &&
            targetStreak.type === 'START';
        if (!canTargetStreakBeUpdated) {
            throw new common_1.BadRequestException(error_1.ERRORS.CANNOT_UPDATE_STREAK);
        }
        return this.streaksRepositoryClient.updateStreak(streakIdNumber, goal.id);
    }
    async endStreak(streakId, goal) {
        const streakIdNumber = Number(streakId);
        if (isNaN(streakIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const targetStreak = goal.streaks.find(({ id }) => id === streakIdNumber);
        const canTargetStreakBeEnded = !!targetStreak &&
            targetStreak.inProgress &&
            targetStreak.type === 'START';
        if (!canTargetStreakBeEnded) {
            throw new common_1.BadRequestException(error_1.ERRORS.CANNOT_END_STREAK);
        }
        return this.streaksRepositoryClient.endStreak(streakIdNumber, goal.id);
    }
};
exports.StreaksService = StreaksService;
exports.StreaksService = StreaksService = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, userexists_guard_1.UserExistsGuard),
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(streaks_repository_client_1.StreaksRepositoryClient)),
    __metadata("design:paramtypes", [streaks_repository_client_1.StreaksRepositoryClient,
        users_service_1.UsersService,
        goals_service_1.GoalsService])
], StreaksService);
