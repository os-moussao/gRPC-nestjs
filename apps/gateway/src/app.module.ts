import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CALC_MICROSERVICE_CLIENT } from './common/constants';
import { ARITHMETIC_PACKAGE_NAME } from 'src/protos-ts/arithmetic';
import { BITWISE_PACKAGE_NAME } from 'src/protos-ts/bitwise';
import { ArithmeticController } from './arithmetic/arithmetic.controller';
import { BitwiseController } from './bitwise/bitwise.controller';
import * as path from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CALC_MICROSERVICE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5001',
          package: [ARITHMETIC_PACKAGE_NAME, BITWISE_PACKAGE_NAME],
          protoPath: [
            path.resolve(__dirname, '../../../protos/arithmetic.proto'),
            path.resolve(__dirname, '../../../protos/bitwise.proto'),
          ],
          loader: {
            longs: Number,
          },
        },
      },
    ]),
  ],
  controllers: [ArithmeticController, BitwiseController],
  providers: [],
})
export class AppModule {}
