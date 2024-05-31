import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { HTTP_CODE_FROM_GRPC } from './grpc-to-http-codes';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as any;
    const message = error.details;
    const statusCode = HTTP_CODE_FROM_GRPC[error.code];

    Logger.error({ error }, 'RpcExceptionFilter');

    const res = host.switchToHttp().getResponse<Response>();

    res.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
