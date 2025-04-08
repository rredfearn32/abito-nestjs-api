import { UsersService } from '../users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    register(): string;
    login(username: string, password: string): Promise<LoginResponseDto | undefined>;
}
