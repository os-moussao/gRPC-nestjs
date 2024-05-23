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
    return { value: 1 };
  }

  multiply(req: IntArray) {
    return { value: 2 };
  }
}
