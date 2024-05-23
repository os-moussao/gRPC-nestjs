import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ARITHMETIC_SERVICE_NAME,
  ArithmeticServiceClient,
} from 'protos-ts/arithmetic';
import { IntArray } from 'protos-ts/common';
import { CALC_MICROSERVICE_CLIENT } from 'src/common/constants';

@Controller('arithmetic')
export class ArithmeticController implements OnModuleInit {
  constructor(
    @Inject(CALC_MICROSERVICE_CLIENT) private readonly clientGrpc: ClientGrpc,
  ) {}

  private arithmeticService: ArithmeticServiceClient;

  onModuleInit() {
    this.arithmeticService =
      this.clientGrpc.getService<ArithmeticServiceClient>(
        ARITHMETIC_SERVICE_NAME,
      );
  }

  @Post('sum')
  sum(@Body() nums: IntArray) {
    return this.arithmeticService.sum(nums);
  }

  @Post('multiply')
  multiply(@Body() nums: IntArray) {
    return this.arithmeticService.multiply(nums);
  }
}
