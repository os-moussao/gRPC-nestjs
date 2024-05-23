import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { ARITHMETIC_PACKAGE_NAME } from './protos-ts/arithmetic';
import { BITWISE_PACKAGE_NAME } from './protos-ts/bitwise';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
          arrays: true,
        },
      },
    },
  );
  await app.listen();
  Logger.log('Calc microservice started...');
}
bootstrap();
