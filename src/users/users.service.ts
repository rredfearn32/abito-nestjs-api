import { Injectable } from '@nestjs/common';
import User from './entities/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      uid: '1',
      username: 'sam@example.com',
      password: 'pass123',
    },
    {
      uid: '2',
      username: 'ash@example.com',
      password: 'pass456',
    },
  ];

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
