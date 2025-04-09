import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequestDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(): string;
    login(loginRequest: LoginRequestDto): Promise<import("./dtos/LoginResponseDto").default>;
    getProfile(req: any): any;
}
