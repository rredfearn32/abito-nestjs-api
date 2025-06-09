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
exports.UserExistsGuard = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../infrastructure/users/users.service");
const errors_1 = require("../modules/auth/messages/errors");
let UserExistsGuard = class UserExistsGuard {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.jwt.sub;
        const userIdAsNumber = Number(userId);
        if (isNaN(userIdAsNumber)) {
            throw new common_1.BadRequestException(errors_1.ERRORS.INVALID_ID_FORMAT);
        }
        const user = await this.usersService.findUserById(userIdAsNumber);
        if (!user) {
            throw new common_1.NotFoundException(errors_1.ERRORS.USER_NOT_FOUND);
        }
        request.user = user;
        return true;
    }
};
exports.UserExistsGuard = UserExistsGuard;
exports.UserExistsGuard = UserExistsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserExistsGuard);
//# sourceMappingURL=userexists.guard.js.map