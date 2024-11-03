import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(ErrorsInterceptor.name)
    private readonly logger: PinoLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: Error) => {
        this.logger.error(err);
        const mappedException =
          err instanceof HttpException
            ? err
            : new InternalServerErrorException();

        return throwError(() => mappedException);
      }),
    );
  }
}
