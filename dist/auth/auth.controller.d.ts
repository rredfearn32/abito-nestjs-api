import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequestDto';
import RegisterRequestDto from './dtos/RegisterRequestDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(newUser: RegisterRequestDto): Promise<import("./dtos/RegisterResponseDto").default>;
    login(loginRequest: LoginRequestDto): Promise<import("./dtos/LoginResponseDto").default>;
    getProfile(req: any): any;
}
