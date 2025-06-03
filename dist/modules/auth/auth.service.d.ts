import { UsersService } from '../../infrastructure/users/users.service';
import LoginResponseDto from './dtos/LoginResponse.dto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequest.dto';
import RegisterResponseDto from './dtos/RegisterResponse.dto';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequest.dto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequest.dto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponse.dto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(newUser: RegisterRequestDto): Promise<RegisterResponseDto>;
    login(username: string, password: string): Promise<LoginResponseDto>;
    deleteAccount(jwt: DeleteAccountRequestDto): void;
    updateProfile(jwt: any, updatedProfile: UpdateProfileRequestDto): Promise<UpdateProfileResponseDto>;
}
