import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/LoginRequest.dto';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import GetProfileResponseDto from './dtos/GetProfileResponse.dto';
import { UsersService } from '../../infrastructure/users/users.service';
import { TokensService } from '../../infrastructure/tokens/tokens.service';
import RefreshRequestDto from './dtos/RefreshRequest.dto';
export declare class AuthController {
    private readonly authService;
    private readonly tokensService;
    private readonly userService;
    constructor(authService: AuthService, tokensService: TokensService, userService: UsersService);
    register(newUser: RegisterRequestDto): Promise<import("./dtos/RegisterResponse.dto").default>;
    login(loginRequest: LoginRequestDto): Promise<import("./dtos/LoginResponse.dto").default>;
    deleteAccount(req: any): void;
    getProfile(req: any): Promise<GetProfileResponseDto>;
    updateProfile(updatedProfile: UpdateProfileRequestDto, req: any): Promise<UpdateProfileResponseDto>;
    refresh(refreshRequest: RefreshRequestDto): Promise<any>;
}
