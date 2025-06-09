import {
  BadRequestException,
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

    const userIdAsNumber = Number(userId);

    if (isNaN(userIdAsNumber)) {
      throw new BadRequestException(ERRORS.INVALID_ID_FORMAT);
    }

    const user = await this.usersService.findUserById(userIdAsNumber);

    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }

    request.user = user;
    return true;
  }
}
