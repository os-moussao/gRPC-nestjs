import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CALCULATOR_PACKAGE_NAME } from './protos-ts/calc';
import path from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5001',
        package: CALCULATOR_PACKAGE_NAME,
        protoPath: path.resolve(__dirname, '../../../protos/calc.proto'),
      },
    },
  );
  await app.listen();
  Logger.log('Calc microservice started...');
}
bootstrap();
