import { UsersRepositoryClient } from './repositories/users.repository-client';
import { User } from '@prisma/client';
import RegisterRequestDto from '../auth/dtos/RegisterRequestDto';
export declare class UsersService {
    private usersRepositoryClient;
    constructor(usersRepositoryClient: UsersRepositoryClient);
    findUser(username: string): Promise<User | undefined>;
    createUser(newUser: RegisterRequestDto): Promise<User | undefined>;
}
