import { Controller } from '@nestjs/common';
import {
  ArithmeticServiceController,
  ArithmeticServiceControllerMethods,
} from './protos-ts/arithmetic';
import { IntArray } from './protos-ts/common';

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
}
