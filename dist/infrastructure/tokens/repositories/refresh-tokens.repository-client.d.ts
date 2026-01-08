import { PrismaService } from '../../prisma/prisma.service';
export declare class RefreshTokensRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(userId: number, token: string, expiresAt: Date): Promise<{
        id: string;
        userId: number;
        token: string;
        expiresAt: Date;
        createdAt: Date;
        revokedAt: Date | null;
    }>;
    find(token: string): Promise<{
        id: string;
        userId: number;
        token: string;
        expiresAt: Date;
        createdAt: Date;
        revokedAt: Date | null;
    }>;
    revoke(token: string): Promise<{
        id: string;
        userId: number;
        token: string;
        expiresAt: Date;
        createdAt: Date;
        revokedAt: Date | null;
    }>;
    revokeAllForUser(userId: number): Promise<import("generated/prisma").Prisma.BatchPayload>;
    delete(): Promise<import("generated/prisma").Prisma.BatchPayload>;
}
