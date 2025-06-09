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
exports.GoalExistsGuard = void 0;
const common_1 = require("@nestjs/common");
const goals_service_1 = require("../modules/goals/goals.service");
const error_1 = require("../modules/goals/messages/error");
let GoalExistsGuard = class GoalExistsGuard {
    constructor(goalsService) {
        this.goalsService = goalsService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.jwt.sub;
        const goalId = request.params.goalId;
        if (!goalId) {
            return true;
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsService.getGoalById(userId, goalId);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        request.goal = goal;
        return true;
    }
};
exports.GoalExistsGuard = GoalExistsGuard;
exports.GoalExistsGuard = GoalExistsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [goals_service_1.GoalsService])
], GoalExistsGuard);
//# sourceMappingURL=goalexists.guard.js.map