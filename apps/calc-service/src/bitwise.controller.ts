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
    const { values } = req;
    return {
      value: values.length ? values.reduce((acc, curr) => acc & curr) : 0,
    };
  }

  or(req: IntArray) {
    const { values } = req;
    return {
      value: values.reduce((acc, curr) => acc | curr, 0),
    };
  }

  xor(req: IntArray) {
    const { values } = req;
    return {
      value: values.reduce((acc, curr) => acc ^ curr, 0),
    };
  }
}
