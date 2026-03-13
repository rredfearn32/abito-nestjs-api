import { Streak } from '../types/Streak';

export function findActiveStreak(streaks: Streak[]): Streak | null {
  return (
    streaks
      .filter((s) => s.inProgress)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0] ?? null
  );
}

export function findPreviousStreaks(streaks: Streak[]): Streak[] {
  return streaks.filter(({ inProgress }) => !inProgress);
}
