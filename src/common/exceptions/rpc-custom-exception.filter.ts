/* eslint-disable @typescript-eslint/no-unused-vars */

import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';

@Catch(RpcException) // capture all RpcExceptions
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
      })
    }



    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}

// docs: https://docs.nestjs.com/microservices/exception-filters

// switchToHttp() isa method provided by NestJS that allows you to switch the context from the default
//  (which could be HTTP, RPC, WebSockets, etc.)
//  to HTTP specifically.  This is useful when you're working within an exception filter and you need to manipulate the HTTP request or response objects directly.

// ExceptionFilter is basically a after middleware that is executed when an RpcException is thrown in the application.