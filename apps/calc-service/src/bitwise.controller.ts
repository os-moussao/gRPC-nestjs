import { Controller } from '@nestjs/common';
import {
  BitwiseServiceController,
  BitwiseServiceControllerMethods,
} from './protos-ts/bitwise';
import { IntArray } from './protos-ts/common';

@Controller()
@BitwiseServiceControllerMethods()
export class BitwiseController implements BitwiseServiceController {
  and(req: IntArray) {
    return { value: 3 };
  }

  or(req: IntArray) {
    return { value: 4 };
  }

  xor(req: IntArray) {
    return { value: 5 };
  }
}
