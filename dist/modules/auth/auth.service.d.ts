import { UsersService } from '../../infrastructure/users/users.service';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import { TokensService } from '../../infrastructure/tokens/tokens.service';
import AuthResponseDto from './dtos/AuthResponse.dto';
export declare class AuthService {
    private readonly userService;
    private tokensService;
    constructor(userService: UsersService, tokensService: TokensService);
    register(newUser: RegisterRequestDto): Promise<AuthResponseDto>;
    login(username: string, password: string): Promise<AuthResponseDto>;
    deleteAccount(jwt: DeleteAccountRequestDto): void;
    updateProfile(jwt: any, updatedProfile: UpdateProfileRequestDto): Promise<UpdateProfileResponseDto>;
}
