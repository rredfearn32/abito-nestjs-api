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
const CreateGoalDto_1 = require("./dtos/CreateGoalDto");
const UpdateGoalDto_1 = require("./dtos/UpdateGoalDto");
const NewStreakDto_1 = require("./dtos/NewStreakDto");
let GoalsController = class GoalsController {
    constructor(userService, goalsService) {
        this.userService = userService;
        this.goalsService = goalsService;
    }
    async getAllGoalsForUser(req) {
        const record = await this.userService.findUserById(req.jwt.sub);
        if (!record) {
            throw new common_1.NotFoundException();
        }
        const goals = await this.goalsService.getUsersGoals(req.jwt.sub);
        const goalsWithoutUserIds = goals.map(({ userId, ...rest }) => rest);
        return goalsWithoutUserIds;
    }
    async getGoalById(goalId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException('Invalid goal id');
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException();
        }
        const { userId, ...goalWithoutUserId } = goal;
        return goalWithoutUserId;
    }
    async createGoal(newGoalDto, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const newGoal = { ...newGoalDto, userId: req.jwt.sub };
        return this.goalsService.createGoal(newGoal);
    }
    async deleteGoal(goalId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException('Invalid goal id');
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException();
        }
        const { userId, ...goalWithoutUserId } = await this.goalsService.deleteGoal(goalIdNumber, req.jwt.sub);
        return goalWithoutUserId;
    }
    async updateGoal(updatedGoal, goalId, req) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException('Invalid goal id');
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException();
        }
        const { userId, ...goalWithoutUserId } = await this.goalsService.updateGoal(goalIdNumber, req.jwt.sub, updatedGoal);
        return goalWithoutUserId;
    }
    async createStreak(goalId, req, newStreak) {
        const user = await this.userService.findUserById(req.jwt.sub);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException('Invalid goal id');
        }
        const goal = await this.goalsService.getGoalById(goalIdNumber, req.jwt.sub);
        if (!goal) {
            throw new common_1.NotFoundException();
        }
        return this.goalsService.createStreak(goalIdNumber, newStreak);
    }
    async endStreak() { }
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
    __metadata("design:paramtypes", [CreateGoalDto_1.CreateGoalDto, Object]),
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
    __metadata("design:paramtypes", [UpdateGoalDto_1.UpdateGoalDto, String, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "updateGoal", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/:id/streak'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, NewStreakDto_1.NewStreakDto]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "createStreak", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/:id/streak'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "endStreak", null);
exports.GoalsController = GoalsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        goals_service_1.GoalsService])
], GoalsController);
//# sourceMappingURL=goals.controller.js.map