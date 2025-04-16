import { UsersRepositoryClient } from './repositories/users.repository-client';
import { User } from '@prisma/client';
import RegisterRequestDto from '../modules/auth/dtos/RegisterRequestDto';
import UpdateProfileRequestDto from '../modules/auth/dtos/UpdateProfileRequestDto';
export declare class UsersService {
    private usersRepositoryClient;
    constructor(usersRepositoryClient: UsersRepositoryClient);
    findUserByUsername(username: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
    createUser(newUser: RegisterRequestDto): Promise<User | undefined>;
    deleteUser(id: number): void;
    updateUser(id: number, updatedProfile: UpdateProfileRequestDto): Promise<User>;
}
