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
exports.GoalsController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../guards/auth.guard");
const users_service_1 = require("../../infrastructure/users/users.service");
const goals_service_1 = require("./goals.service");
const UpdateGoal_dto_1 = require("./dtos/UpdateGoal.dto");
const CreateStreak_dto_1 = require("./dtos/CreateStreak.dto");
const CreateGoal_dto_1 = require("./dtos/CreateGoal.dto");
const streaks_service_1 = require("./streaks.service");
let GoalsController = class GoalsController {
    constructor(userService, goalsService, streaksService) {
        this.userService = userService;
        this.goalsService = goalsService;
        this.streaksService = streaksService;
    }
    async getAllGoalsForUser(req) {
        return this.goalsService.getUsersGoals(req.jwt.sub);
    }
    async getGoalById(goalId, req) {
        return this.goalsService.getGoalById(req.jwt.sub, goalId);
    }
    async createGoal(newGoalDto, req) {
        return this.goalsService.createGoal(newGoalDto, req.jwt.sub);
    }
    async deleteGoal(goalId, req) {
        return this.goalsService.deleteGoal(goalId, req.jwt.sub);
    }
    async updateGoal(updatedGoal, goalId, req) {
        return this.goalsService.updateGoal(goalId, req.jwt.sub, updatedGoal);
    }
    async createStreak(goalId, req, newStreak) {
        return this.streaksService.createStreak(goalId, req.jwt.sub, newStreak);
    }
    async updateStreak(goalId, streakId, req) {
        return this.streaksService.updateStreak(streakId, req.jwt.sub, goalId);
    }
    async endStreak(goalId, streakId, req) {
        return this.streaksService.endStreak(streakId, req.jwt.sub, goalId);
    }
};
exports.GoalsController = GoalsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "getAllGoalsForUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "getGoalById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGoal_dto_1.CreateGoalRequestDto, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "createGoal", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "deleteGoal", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateGoal_dto_1.UpdateGoalDto, String, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "updateGoal", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/:id/streak'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateStreak_dto_1.NewStreakDto]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "createStreak", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/:goalId/streak/:streakId'),
    __param(0, (0, common_1.Param)('goalId')),
    __param(1, (0, common_1.Param)('streakId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "updateStreak", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('/:goalId/streak/:streakId'),
    __param(0, (0, common_1.Param)('goalId')),
    __param(1, (0, common_1.Param)('streakId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "endStreak", null);
exports.GoalsController = GoalsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        goals_service_1.GoalsService,
        streaks_service_1.StreaksService])
], GoalsController);
//# sourceMappingURL=goals.controller.js.map