import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewStreakDto } from '../dtos/NewStreakDto';
export declare class StreaksRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    createStreak(goalId: number, newStreak: NewStreakDto): Promise<{
        id: number;
        type: import("generated/prisma").$Enums.StreakType;
        createdAt: Date;
        updatedAt: Date | null;
        goalId: number;
    }>;
}
