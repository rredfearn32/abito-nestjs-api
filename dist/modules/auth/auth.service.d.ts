import { UsersService } from '../../infrastructure/users/users.service';
import LoginResponseDto from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import RegisterRequestDto from './dtos/RegisterRequestDto';
import RegisterResponseDto from './dtos/RegisterResponseDto';
import DeleteAccountRequestDto from './dtos/DeleteAccountRequestDto';
import UpdateProfileRequestDto from './dtos/UpdateProfileRequestDto';
import UpdateProfileResponseDto from './dtos/UpdateProfileResponseDto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(newUser: RegisterRequestDto): Promise<RegisterResponseDto>;
    login(username: string, password: string): Promise<LoginResponseDto>;
    deleteAccount(jwt: DeleteAccountRequestDto): void;
    updateProfile(jwt: any, updatedProfile: UpdateProfileRequestDto): Promise<UpdateProfileResponseDto>;
}
