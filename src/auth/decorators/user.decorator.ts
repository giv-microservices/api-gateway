// estos decoradores solo son para extraer de la request elementos
// y devolverlos para que el controlador lo tome directamente la request

// el guard AuthGuard añade el usuario y el token a la request y son tomados aqui

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';



export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {


    const request = ctx.switchToHttp().getRequest();

    if ( !request.user ) {
      throw new InternalServerErrorException('User not found in request (AuthGuard called?)');
    }

    return request.user;
  },
);