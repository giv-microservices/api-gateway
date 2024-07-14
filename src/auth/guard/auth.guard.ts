// este guard verifica que venga el token, que sea valido 
// y si lo es abstract;ade su informacin desencritada y verificada por el micro servicio
// en la request

import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  
  import { Request } from 'express';
  import { firstValueFrom } from 'rxjs';
  import { NATS_SERVICE } from 'src/config';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(
      @Inject( NATS_SERVICE ) private readonly client: ClientProxy, 
    ) {}
  
  
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      try {
        // contacta con el micro servicio de auth para verificar el token
        const { user, token:newToken } = await firstValueFrom(
          this.client.send('auth.verify.user', token)
        );
        // si el  y el usuario es correcto, lo añadimos a la request
        // el token sera renovado en el microservicio de auth
        request['user'] = user;
        request['token'] = newToken;
  
  
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }