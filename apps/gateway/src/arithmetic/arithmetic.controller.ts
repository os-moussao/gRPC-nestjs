import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ARITHMETIC_SERVICE_NAME,
  ArithmeticServiceClient,
  SortMsg,
} from 'src/protos-ts/arithmetic';
import { IntArray } from 'src/protos-ts/common';
import { CALC_MICROSERVICE_CLIENT } from 'src/common/constants';
import { RpcExceptionFilter } from 'src/common/rpc-exception.filter';
import { RpcErrorsInterceptor } from 'src/common/rpc-errors.interceptor';

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

  @UseInterceptors(RpcErrorsInterceptor)
  @UseFilters(RpcExceptionFilter)
  @Post('sort')
  sort(@Body() body: SortMsg) {
    return this.arithmeticService.sort(body);
  }
}
