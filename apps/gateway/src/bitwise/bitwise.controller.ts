import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BITWISE_SERVICE_NAME, BitwiseServiceClient } from 'src/protos-ts/bitwise';
import { IntArray } from 'src/protos-ts/common';
import { CALC_MICROSERVICE_CLIENT } from 'src/common/constants';

@Controller('bitwise')
export class BitwiseController implements OnModuleInit {
  constructor(
    @Inject(CALC_MICROSERVICE_CLIENT) private readonly clientGrpc: ClientGrpc,
  ) {}

  private bitwiseService: BitwiseServiceClient;

  onModuleInit() {
    this.bitwiseService =
      this.clientGrpc.getService<BitwiseServiceClient>(BITWISE_SERVICE_NAME);
  }

  @Post('and')
  and(@Body() nums: IntArray) {
    return this.bitwiseService.and(nums);
  }

  @Post('or')
  or(@Body() nums: IntArray) {
    return this.bitwiseService.or(nums);
  }

  @Post('xor')
  xor(@Body() nums: IntArray) {
    return this.bitwiseService.xor(nums);
  }
}
