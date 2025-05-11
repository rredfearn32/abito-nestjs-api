import { GoalsRepositoryClient } from './repositories/goals.repository-client';
import { NewGoal } from './types/NewGoal';
export declare class GoalsService {
    private goalsRepositoryClient;
    constructor(goalsRepositoryClient: GoalsRepositoryClient);
    createGoal(newGoal: NewGoal): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
    getUsersGoals(userId: number): Promise<{
        id: number;
        title: string;
        userId: number;
    }[]>;
    getGoalById(goalId: number, ownerId: number): Promise<{
        id: number;
        title: string;
        userId: number;
    }>;
}
