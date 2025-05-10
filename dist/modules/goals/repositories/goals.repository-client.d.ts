import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NewGoal } from '../types/NewGoal';
export declare class GoalsRepositoryClient {
    private prismaService;
    constructor(prismaService: PrismaService);
    createGoal(newGoal: NewGoal): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
}
