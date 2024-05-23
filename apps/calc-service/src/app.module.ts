import { Module } from '@nestjs/common';
import { ArithmeticController } from './arithmetic.controller';
import { BitwiseController } from './bitwise.controller';
@Module({
  imports: [],
  controllers: [ArithmeticController, BitwiseController],
  providers: [],
})
export class AppModule {}
