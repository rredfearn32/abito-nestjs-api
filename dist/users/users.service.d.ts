import User from './entities/user.interface';
export declare class UsersService {
    private readonly users;
    findUser(username: string): Promise<User | undefined>;
}
