import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../infrastructure/users/users.service';
import { ERRORS } from '../modules/auth/messages/errors';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.jwt.sub;

    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    request.user = user;
    return true;
  }
}
