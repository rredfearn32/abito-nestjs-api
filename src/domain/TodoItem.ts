import { InvalidImportanceException } from './InvalidImportanceException';

export class TodoItem {
  constructor(title: string, importance: number, done = false) {
    if (importance < 1 || importance > 5) {
      throw new InvalidImportanceException();
    }

    this.title = title;
    this.importance = importance;
    this.done = done;
    this.createdAt = new Date();
  }

  createdAt: Date;
  title: string;
  importance: number;
  done: boolean;
}
