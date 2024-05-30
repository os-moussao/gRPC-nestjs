import { Controller } from '@nestjs/common';
import {
  ArithmeticServiceController,
  ArithmeticServiceControllerMethods,
  OrderEnum,
  SortMsg,
} from './protos-ts/arithmetic';
import { IntArray } from './protos-ts/common';
import { Observable } from 'rxjs';

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
    const { values, order } = req;
    values.sort((a, b) => (order === OrderEnum.INC ? a - b : b - a));
    return { values };
  }
}
