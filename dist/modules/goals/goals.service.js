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
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const goals_repository_client_1 = require("./repositories/goals.repository-client");
const streaks_repository_client_1 = require("./repositories/streaks.repository-client");
let GoalsService = class GoalsService {
    constructor(goalsRepositoryClient, streaksRepositoryClient) {
        this.goalsRepositoryClient = goalsRepositoryClient;
        this.streaksRepositoryClient = streaksRepositoryClient;
    }
    async createGoal(newGoal) {
        return this.goalsRepositoryClient.createGoal(newGoal);
    }
    async getUsersGoals(userId) {
        return this.goalsRepositoryClient.getUsersGoals(userId);
    }
    async getGoalById(goalId, ownerId) {
        return this.goalsRepositoryClient.getGoalById(goalId, ownerId);
    }
    async deleteGoal(goalId, ownerId) {
        return this.goalsRepositoryClient.deleteGoal(goalId, ownerId);
    }
    async updateGoal(goalId, ownerId, updatedGoal) {
        return this.goalsRepositoryClient.updateGoal(goalId, ownerId, updatedGoal);
    }
    async createStreak(goalId, newStreak) {
        return this.streaksRepositoryClient.createStreak(goalId, newStreak);
    }
    async updateStreak(streakId, goalId) {
        return this.streaksRepositoryClient.updateStreak(streakId, goalId);
    }
    async endStreak(streakId, goalId) {
        return this.streaksRepositoryClient.endStreak(streakId, goalId);
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(goals_repository_client_1.GoalsRepositoryClient)),
    __param(1, (0, common_1.Inject)(streaks_repository_client_1.StreaksRepositoryClient)),
    __metadata("design:paramtypes", [goals_repository_client_1.GoalsRepositoryClient,
        streaks_repository_client_1.StreaksRepositoryClient])
], GoalsService);
//# sourceMappingURL=goals.service.js.map