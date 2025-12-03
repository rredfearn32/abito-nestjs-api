import { UsersService } from '../../infrastructure/users/users.service';
import LoginResponseDto from './dtos/LoginResponse.dto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import RegisterResponseDto from './dtos/RegisterResponse.dto';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private configService;
    private jwtService;
    constructor(userService: UsersService, configService: ConfigService, jwtService: JwtService);
    private signAccessToken;
    private signRefreshToken;
    register(newUser: RegisterRequestDto): Promise<RegisterResponseDto>;
    login(username: string, password: string): Promise<LoginResponseDto>;
    deleteAccount(jwt: DeleteAccountRequestDto): void;
    updateProfile(jwt: any, updatedProfile: UpdateProfileRequestDto): Promise<UpdateProfileResponseDto>;
}
