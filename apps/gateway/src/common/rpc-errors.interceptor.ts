import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class RpcErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Logger.error({ error }, 'RpcErrorsInterceptor');

        if (error.code && error.details) {
          return throwError(() => new RpcException(error));
        }
        return throwError(() => error);
      }),
    );
  }
}
