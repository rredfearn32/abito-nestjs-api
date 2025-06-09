import { Streak } from './Streak';
export interface Goal {
    id: number;
    title: string;
    userId: number;
    streaks: Streak[];
}
