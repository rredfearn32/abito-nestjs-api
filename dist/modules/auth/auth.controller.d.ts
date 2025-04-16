import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequestDto';
import RegisterRequestDto from './dtos/RegisterRequestDto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequestDto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponseDto';
import GetProfileResponseDto from './dtos/GetProfileResponseDto';
import { UsersService } from '../../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    register(newUser: RegisterRequestDto): Promise<import("./dtos/RegisterResponseDto").default>;
    login(loginRequest: LoginRequestDto): Promise<import("./dtos/LoginResponseDto").default>;
    deleteAccount(req: any): void;
    getProfile(req: any): Promise<GetProfileResponseDto>;
    updateProfile(updatedProfile: UpdateProfileRequestDto, req: any): Promise<UpdateProfileResponseDto>;
}
