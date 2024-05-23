// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v5.26.1
// source: arithmetic.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { IntArray } from "./common";
import { Int64Value } from "./google/protobuf/wrappers";

export const protobufPackage = "arithmetic";

export const ARITHMETIC_PACKAGE_NAME = "arithmetic";

export interface ArithmeticServiceClient {
  sum(request: IntArray): Observable<Int64Value>;

  multiply(request: IntArray): Observable<Int64Value>;
}

export interface ArithmeticServiceController {
  sum(request: IntArray): Promise<Int64Value> | Observable<Int64Value> | Int64Value;

  multiply(request: IntArray): Promise<Int64Value> | Observable<Int64Value> | Int64Value;
}

export function ArithmeticServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sum", "multiply"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ArithmeticService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ArithmeticService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ARITHMETIC_SERVICE_NAME = "ArithmeticService";
