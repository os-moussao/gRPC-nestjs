# Overview
A demo for exposing multiple services from a single gRPC server.

# [App Design](https://app.eraser.io/workspace/Y6YKeLkJgzKmXtPnmlkO?origin=share)

![grpc-design](https://github.com/os-moussao/gRPC-nestjs/assets/78625018/f21af68d-6235-487f-a3ee-4d8a6abab44d)


# Installation
```npm run build```

# Running the app
Start the microservice:

```npm run run:calc```

Start the gateway:

```npm run run:gateway```

Open http://localhost:3000

# Endpoints:

- POST /arithmetic/sum
- POST /arithmetic/multiply
- POST /bitwise/and
- POST /bitwise/or
- POST /bitwise/xor

Body for all endpoints:
```typescript
{
  values: number[];
}
```
