import { UsersService } from '../users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(): string;
    login(username: string, password: string): Promise<LoginResponseDto>;
}
