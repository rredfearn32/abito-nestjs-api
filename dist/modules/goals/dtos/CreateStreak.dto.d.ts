import { StreakType } from '../../../../generated/prisma';
export declare class NewStreakDto {
    type: StreakType;
}
export declare class CreateStreakResponseDto {
    id: number;
    createdAt: string;
    updatedAt: string;
    type: StreakType;
    inProgress: boolean;
    goalId: number;
}
