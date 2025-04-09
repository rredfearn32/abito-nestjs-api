import { PrismaService } from '../../prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    deleteUser(userId: number): import("generated/prisma").Prisma.Prisma__UserClient<{
        id: number;
        username: string;
        password: string;
    }, never, import("generated/prisma/runtime/library").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    updateUser(id: number, updatedUser: Prisma.UserUpdateInput): Promise<User>;
}
