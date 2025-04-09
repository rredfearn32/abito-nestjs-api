import { PrismaService } from '../../prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    deleteUser(userId: number): Promise<{
        id: number;
        username: string;
        password: string;
    }>;
}
