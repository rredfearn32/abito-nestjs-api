import { UsersService } from '../users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequestDto';
import RegisterResponseDto from './dtos/RegisterResponseDto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(newUser: RegisterRequestDto): Promise<RegisterResponseDto>;
    login(username: string, password: string): Promise<LoginResponseDto>;
}
