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
const CreateGoal_dto_1 = require("./dtos/CreateGoal.dto");
const UpdateGoal_dto_1 = require("./dtos/UpdateGoal.dto");
const NewStreak_dto_1 = require("./dtos/NewStreak.dto");
const error_1 = require("./messages/error");
let GoalsController = class GoalsController {
    constructor(userService, goalsService) {
        this.userService = userService;
        this.goalsService = goalsService;
    }
    async getAllGoalsForUser(req) {
        return this.goalsService.getUsersGoals(req.jwt.sub);
    }
    async getGoalById(goalId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        const { userId, ...goalWithoutUserId } = goal;
        return goalWithoutUserId;
    }
    async createGoal(newGoalDto, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const newGoal = { ...newGoalDto, userId: req.jwt.sub };
        return this.goalsService.createGoal(newGoal);
    }
    async deleteGoal(goalId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        const { userId, ...goalWithoutUserId } = await this.goalsService.deleteGoal(goalIdNumber, req.jwt.sub);
        return goalWithoutUserId;
    }
    async updateGoal(updatedGoal, goalId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        const { userId, ...goalWithoutUserId } = await this.goalsService.updateGoal(goalIdNumber, req.jwt.sub, updatedGoal);
        return goalWithoutUserId;
    }
    async createStreak(goalId, req, newStreak) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        if (goal.streaks.filter(({ inProgress }) => inProgress).length) {
            throw new common_1.BadRequestException(error_1.ERRORS.CANNOT_CREATE_NEW_STREAK);
        }
        return this.goalsService.createStreak(goalIdNumber, newStreak);
    }
    async updateStreak(goalId, streakId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
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
        return this.goalsService.updateStreak(streakIdNumber, goalIdNumber);
    }
    async endStreak(goalId, streakId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
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
        return this.goalsService.endStreak(streakIdNumber, goalIdNumber);
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
    __metadata("design:paramtypes", [CreateGoal_dto_1.CreateGoalDto, Object]),
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
    __metadata("design:paramtypes", [String, Object, NewStreak_dto_1.NewStreakDto]),
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
        goals_service_1.GoalsService])
], GoalsController);
//# sourceMappingURL=goals.controller.js.map