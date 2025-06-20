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
const users_service_1 = require("../../infrastructure/users/users.service");
const error_1 = require("./messages/error");
const class_transformer_1 = require("class-transformer");
const GetAllGoalsForUserResponse_dto_1 = require("./dtos/GetAllGoalsForUserResponse.dto");
const GetSingleGoalResponse_dto_1 = require("./dtos/GetSingleGoalResponse.dto");
const DeleteGoal_dto_1 = require("./dtos/DeleteGoal.dto");
const CreateGoal_dto_1 = require("./dtos/CreateGoal.dto");
let GoalsService = class GoalsService {
    constructor(goalsRepositoryClient, userService) {
        this.goalsRepositoryClient = goalsRepositoryClient;
        this.userService = userService;
    }
    async createGoal(newGoalDto, userId) {
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const newGoal = { ...newGoalDto, userId };
        const createdGoal = this.goalsRepositoryClient.createGoal(newGoal);
        return (0, class_transformer_1.plainToInstance)(CreateGoal_dto_1.CreateGoalResponseDto, createdGoal);
    }
    async getUsersGoals(userId) {
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goals = await this.goalsRepositoryClient.getUsersGoals(userId);
        return goals.map((goal) => (0, class_transformer_1.plainToInstance)(GetAllGoalsForUserResponse_dto_1.GetAllGoalsForUserResponseDto, goal));
    }
    async getGoalById(userId, goalId) {
        console.log('HERE', userId);
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException(error_1.ERRORS.USER_NOT_FOUND);
        }
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.goalsRepositoryClient.getGoalById(goalIdNumber, userId);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        return (0, class_transformer_1.plainToInstance)(GetSingleGoalResponse_dto_1.GetSingleGoalResponseDto, goal);
    }
    async deleteGoal(goalId, ownerId) {
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.getGoalById(goalIdNumber, ownerId);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        const deleteGoalResult = this.goalsRepositoryClient.deleteGoal(goalIdNumber, Number(ownerId));
        return (0, class_transformer_1.plainToInstance)(DeleteGoal_dto_1.DeleteGoalResponseDto, deleteGoalResult);
    }
    async updateGoal(goalId, ownerId, updatedGoal) {
        const goalIdNumber = Number(goalId);
        if (isNaN(goalIdNumber)) {
            throw new common_1.BadRequestException(error_1.ERRORS.INVALID_ID_FORMAT);
        }
        const goal = await this.getGoalById(Number(ownerId), goalId);
        if (!goal) {
            throw new common_1.NotFoundException(error_1.ERRORS.GOAL_NOT_FOUND);
        }
        const updatedGoalResponse = this.goalsRepositoryClient.updateGoal(goalIdNumber, Number(ownerId), updatedGoal);
        return (0, class_transformer_1.plainToInstance)(GetSingleGoalResponse_dto_1.GetSingleGoalResponseDto, updatedGoalResponse);
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(goals_repository_client_1.GoalsRepositoryClient)),
    __metadata("design:paramtypes", [goals_repository_client_1.GoalsRepositoryClient,
        users_service_1.UsersService])
], GoalsService);
//# sourceMappingURL=goals.service.js.map