import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../infrastructure/users/users.service';
export declare class UserExistsGuard implements CanActivate {
    private readonly usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
