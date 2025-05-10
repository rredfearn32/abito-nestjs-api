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
        return { title: 'bar' };
    }
    async createGoal(newGoalDto, req) {
        const record = await this.userService.findUserById(req.jwt.sub);
        if (!record) {
            throw new common_1.NotFoundException();
        }
        const newGoal = { ...newGoalDto, userId: req.jwt.sub };
        return this.goalsService.createGoal(newGoal);
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
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGoalDto_1.CreateGoalDto, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "createGoal", null);
exports.GoalsController = GoalsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        goals_service_1.GoalsService])
], GoalsController);
//# sourceMappingURL=goals.controller.js.map