import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_ERROR } from '../messages/users.errors';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.jwt.sub;

    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(USER_ERROR.USER_NOT_FOUND);
    }

    request.user = user;
    return true;
  }
}
