import {
  BadRequestException,
  Controller,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import {
  ArithmeticServiceController,
  ArithmeticServiceControllerMethods,
  OrderEnum,
  SortMsg,
} from './protos-ts/arithmetic';
import { IntArray } from './protos-ts/common';
import { NotFoundError, Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { throwError } from 'rxjs';

import * as grpc from '@grpc/grpc-js';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception.getError());
  }
}

@UseFilters(ExceptionFilter)
@Controller()
@ArithmeticServiceControllerMethods()
export class ArithmeticController implements ArithmeticServiceController {
  sum(req: IntArray) {
    const { values } = req;
    return {
      value: values.reduce((acc, curr) => acc + curr, 0),
    };
  }

  multiply(req: IntArray) {
    const { values } = req;
    return {
      value: values.reduce((acc, curr) => acc * curr, 1),
    };
  }

  sort(req: SortMsg): IntArray | Promise<IntArray> | Observable<IntArray> {
    if (!['INC', 'DEC'].includes(req.order)) {
      throw new RpcException({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'INVALID_SORT_ORDER',
      });
    }
    const { values, order } = req;
    values.sort((a, b) => (order === OrderEnum.INC ? a - b : b - a));
    return { values };
  }
}
