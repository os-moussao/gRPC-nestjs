import { Controller } from '@nestjs/common';
import {
  ArithmeticServiceController,
  ArithmeticServiceControllerMethods,
  OrderEnum,
  SortMsg,
} from './protos-ts/arithmetic';
import { IntArray } from './protos-ts/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

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
